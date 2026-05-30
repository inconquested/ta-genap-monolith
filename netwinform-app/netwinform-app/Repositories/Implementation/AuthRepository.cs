using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Helpers;
using netwinform_app.Models;
using netwinform_app.Repositories.Interfaces;
using Newtonsoft.Json;

namespace netwinform_app.Repositories.Implementation
{
    public class AuthRepository : IAuthRepository
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AuthRepository> _logger;

        public AuthRepository(HttpClient httpClient, ILogger<AuthRepository> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            
        }

        // ── Login does NOT need a bearer token ──────────────────────────────
        public async Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto dto)
        {
            // 1. Log the intent (but hide the password for security!)
            _logger.LogInformation("Login attempt for user: {Email}", dto.Email);

            var json = JsonConvert.SerializeObject(dto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync("login", content);
                var body = await response.Content.ReadAsStringAsync();

                // 2. Log non-success status codes with the body for context
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Login failed. Status: {StatusCode}, Response: {Body}",
                        (int)response.StatusCode, body);
                }

                return JsonConvert.DeserializeObject<ApiResponse<LoginResponseDto>>(body);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogCritical(ex, "Network connectivity error during Login. Target: {Url}", _httpClient.BaseAddress + "login");
 
                throw;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to parse Login response. The API might have returned HTML instead of JSON.");
                return null;
            }
        }

        // ── Logout requires bearer token ─────────────────────────────────────
        public async Task<ApiResponse<object>> LogoutAsync()
        {
            _logger.LogInformation("Attempting to logout current user.");

            try
            {
                var request = BuildAuthRequest(HttpMethod.Post, "logout");
                var response = await _httpClient.SendAsync(request);
                var body = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("User logged out successfully.");
                }
                else
                {
                    _logger.LogWarning("Logout API returned error: {StatusCode} - {Body}", (int)response.StatusCode, body);
                }

                return JsonConvert.DeserializeObject<ApiResponse<object>>(body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred during logout.");
                return null;
            }
        }

        // ── Helper: create a request with Authorization header ───────────────
        private HttpRequestMessage BuildAuthRequest(HttpMethod method, string relativeUrl)
        {
            var request = new HttpRequestMessage(method, relativeUrl);
            var token = TokenStorageHelper.GetToken();

            if (!string.IsNullOrEmpty(token))
                request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {token}");

            return request;
        }
    }
}
