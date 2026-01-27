using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class User
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("full_name")]
        public string FullName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("email_verified_at")]
        public string EmailVerified { get; set; }
        [JsonProperty("role")]
        public string PasswordVerified { get; set; }
        [JsonProperty("two_factor_secret")]
        public string TwoFactorSecret { get; set; }
        [JsonProperty("two_factor_recovery_codes")]
        public string TwoFactorSecretVerified { get; set; }
        [JsonProperty("remember_token")]
        public string RememberToken { get; set  ; }
    }
}
