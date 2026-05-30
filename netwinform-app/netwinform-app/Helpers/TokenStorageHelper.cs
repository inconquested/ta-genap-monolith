using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netwinform_app.Helpers
{
    public static class TokenStorageHelper
    {
        private static readonly string _tokenFilePath =
            Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "token.dat");

        public static void SaveToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new ArgumentException("Token cannot be empty.", nameof(token));

            File.WriteAllText(_tokenFilePath, token.Trim());
        }

        public static string GetToken()
        {
            if (!File.Exists(_tokenFilePath))
                return null;

            var token = File.ReadAllText(_tokenFilePath).Trim();
            return string.IsNullOrEmpty(token) ? null : token;
        }

        public static void ClearToken()
        {
            if (File.Exists(_tokenFilePath))
                File.Delete(_tokenFilePath);
        }

        public static bool HasToken()
        {
            return !string.IsNullOrEmpty(GetToken());
        }
    }
}
