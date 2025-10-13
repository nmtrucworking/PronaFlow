using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.User;
using PronaFlow.Core.Interfaces;
using System.Threading.Tasks;


namespace PronaFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")] // POST: api/auth/register
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            try
            {
                var createdUser = await _userService.Register(userForRegisterDto);

                // Return the created user details (excluding sensitive information like password)

                return StatusCode(201); // 201 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400 Bad Request with error message
            }
        }

        [HttpPost("login")] // POST: api/auth/login
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // Call the Logiin method from the UserService
            var token = await _userService.Login(userForLoginDto);

            if (token == null)
            {
                // If Service returns null, it means authentication failed
                return Unauthorized("Invalid username or password"); // 401 Unauthorized
            }

            return Ok(new { token });
        }
    }
}
