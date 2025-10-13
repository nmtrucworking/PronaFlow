using PronaFlow.Core.DTOs.User;
using PronaFlow.Core.Models;
using System.Threading.Tasks;

namespace PronaFlow.Core.Interfaces;

public interface IUserService
{
    Task<User> Register(UserForRegisterDto userForRegisterDto);
    Task<String?> Login(UserForLoginDto useForLoginDto);
}