using Microsoft.EntityFrameworkCore; // using .UseSqlServer
using Microsoft.AspNetCore.Authentication.JwtBearer; // using JwtBearerDefaults
using System.Text; // using Encoding
using Microsoft.IdentityModel.Tokens; // using SymmetricSecurityKey, TokenValidationParameters

using PronaFlow.Core.Interfaces;
using PronaFlow.Services; // using UserService
using PronaFlow.Core.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// get connection_string from appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// register PronaFlowDbContext with DI Container
builder.Services.AddDbContext<PronaFlowDbContext>(options => options.UseSqlServer(connectionString)); // Fix: use correct parameter name and method


// JWT Authentication Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Configure JWT validation parameters
        ValidateIssuer = false,
        ValidateAudience = false,

        // Signing key 
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),

        ClockSkew = TimeSpan.Zero // Optional: Eliminate delay when token expirses
    };
});

// Register application services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IWorkspaceService, WorkspaceService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ITaskListService, TaskListService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ISubtaskService, SubtaskService>();
builder.Services.AddScoped<IActivityService, ActivityService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<IAttachmentService, AttachmentService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ITrashService, TrashService>();

// CORS Configuration: Allow any origin, header, and method (for development purposes)
// In production, restrict this to specific origins
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin() // 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
// Serve default files (e.g., index.html).
app.UseDefaultFiles();
// Serve static files (e.g., HTML, CSS, JS) from wwwroot folder.
app.UseStaticFiles();

app.UseRouting(); // Add routing middleware (normally UseRouting was called by default)

// Use CORS policy
app.UseCors(MyAllowSpecificOrigins);

// Enable CORS
app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Fallback route for SPA
//app.MapGet("/index", async context =>
//{
//    context.Response.ContentType = "text/html";
//    await context.Response.SendFileAsync("wwwroot/index.html");
//});

app.MapGet("/pages/home.html", context =>
{
    context.Response.Redirect("/");
    return Task.CompletedTask;
});

app.MapFallbackToFile("index.html");

app.Run();
