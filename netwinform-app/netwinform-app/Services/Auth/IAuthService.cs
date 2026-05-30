using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netwinform_app.Services.Auth
{
    public interface IAuthService
    {
        Task LoginAsync(string email, string password);
        Task LogoutAsync();
        bool IsLoggedIn();
    }
}
