using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Helpers;
using netwinform_app.Repositories.Interfaces;

namespace netwinform_app.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task LoginAsync(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email wajib diisi.");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password wajib diisi.");

            var dto = new LoginRequestDto { Email = email, Password = password };
            var response = await _authRepository.LoginAsync(dto);

            if (!response.Success)
                throw new Exception(response.Message ?? "Login failed.");

            if (response.Data == null || string.IsNullOrEmpty(response.Data.Token))
                throw new Exception("Maaf, terjadi kesalahan.");

            TokenStorageHelper.SaveToken(response.Data.Token);
        }

        public async Task LogoutAsync()
        {
            try
            {
                if (TokenStorageHelper.HasToken())
                    await _authRepository.LogoutAsync();
            }
            finally
            {
                TokenStorageHelper.ClearToken();
            }
        }

        public bool IsLoggedIn()
        {
            return TokenStorageHelper.HasToken();
        }
    }
}
