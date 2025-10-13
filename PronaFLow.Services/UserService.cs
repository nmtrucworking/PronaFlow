using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// External libraries
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.User;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.IdentityModel.Tokens.Jwt;

// System libraries
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PronaFlow.Services; // Ensure the namespace matches my project structure


public class UserService : IUserService
{
    // Private field: Database context for accessing user data.
    private readonly PronaFlowDbContext _context;
    private readonly IConfiguration _config;

    // Constructor: Initializes the UserService with a database context.
    public UserService(PronaFlowDbContext context, IConfiguration config)
    {
        _context = context; // Assign the provided context to the private field.
        _config = config; // Assign the provided configuration the the private field.
    }


    /* Method: Registers a new user.
     *
     */
    public async Task<User> Register(UserForRegisterDto userForRegisterDto)
    {
        // 1. Check if the email is existing
        if (await _context.Users.AnyAsync(u => u.Email == userForRegisterDto.Email))
        {
            throw new Exception("Email already exists");
        }

        // 2. Hash the password
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(userForRegisterDto.Password);

        // 3. Create a new User entity
        var user = new User
        {
            FullName = userForRegisterDto.FullName,
            Email = userForRegisterDto.Email,
            PasswordHash = passwordHash,
            Username = userForRegisterDto.Email.Split('@')[0]
            // other properties can be set to default values or left null
        };

        // try-catch block
        try
        {
            await _context.Users.AddAsync(user); // Add the new user to the context 
            await _context.SaveChangesAsync(); // Save changes to the database

            // 3. Automatically Create a default workspace for the new user
            var defaultWorkspace = new Workspace
            {
                Name = $"{user.FullName}'s Workspace",
                OwnerId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Workspaces.AddAsync(defaultWorkspace); // Add the default workspace to the context 
            await _context.SaveChangesAsync(); // Save changes to the database
        }
        catch (DbUpdateException ex)
        {
            throw;
        }
        return user;
    }

    // Method: Logs in a user.
    public async Task<string?> Login(UserForLoginDto userForLoginDto)
    {
        // 1. Find the user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userForLoginDto.Email);

        // 2. If user not found or password is incorrect, return null
        if (user == null || !BCrypt.Net.BCrypt.Verify(userForLoginDto.Password, user.PasswordHash))
        {
            return null;
        }

        // 4. Generate JWT Token
        string token = CreateToken(user);
        return token;
    }

    // Helper method: Generate JWT token for authenticated user
    private string CreateToken(User user)
    {
        // Create list of "claims" - pieces of information about the user
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Role, user.Role)
        };

        // Get the secret-key from configuration (appsettings.json)
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _config.GetSection("AppSettings:Token").Value!));

        // Create signing credentials using the secret-key and a hashing algorithm
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        // Create the token-descriptor 
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(DateTime.Now.Hour >= 12 ? 1 : 2), // Toeken valid for 1 day if created after noon, else 2 days.
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
