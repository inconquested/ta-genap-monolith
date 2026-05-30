using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Models;

namespace netwinform_app.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto dto);
        Task<ApiResponse<object>> LogoutAsync();
    }
}
