using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
    public class PollCategoryRepository : IPollCategoryRepository
    {
        private const string Endpoint = "poll-categories";
        private readonly HttpClient _httpClient;
        private readonly ILogger<PollCategoryRepository> _logger;

        public PollCategoryRepository(HttpClient httpClient, ILogger<PollCategoryRepository> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<ApiResponse<List<PollCategory>>> GetAllAsync()
        {
            var request = BuildAuthRequest(HttpMethod.Get, Endpoint);
            _logger.LogInformation($"request: {request}");
            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<List<PollCategory>>(body);
        }

        public async Task<ApiResponse<PollCategory>> GetByIdAsync(string id)
        {
            var request = BuildAuthRequest(HttpMethod.Get, $"{Endpoint}/{id}");
            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<PollCategory>(body);
        }

        public async Task<ApiResponse<PollCategory>> CreateAsync(CreatePollCategoryDto dto)
        {
            var request = BuildAuthRequest(HttpMethod.Post, Endpoint);
            request.Content = JsonContent(dto);

            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<PollCategory>(body);
        }

        public async Task<ApiResponse<PollCategory>> UpdateAsync(string id, UpdatePollCategoryDto dto)
        {
            var request = BuildAuthRequest(HttpMethod.Put, $"{Endpoint}/{id}");
            request.Content = JsonContent(dto);

            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<PollCategory>(body);
        }

        public async Task<ApiResponse<object>> DeleteAsync(string id)
        {
            var request = BuildAuthRequest(HttpMethod.Delete, $"{Endpoint}/{id}");
            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<object>(body);
        }

        // ── Helpers ──────────────────────────────────────────────────────────

        private HttpRequestMessage BuildAuthRequest(HttpMethod method, string url)
        {
            var request = new HttpRequestMessage(method, url);
            var token = TokenStorageHelper.GetToken();

            if (!string.IsNullOrEmpty(token))
                new AuthenticationHeaderValue("Bearer", token);

            return request;
        }

        private static StringContent JsonContent(object obj)
        {
            return new StringContent(
                JsonConvert.SerializeObject(obj),
                Encoding.UTF8,
                "application/json");
        }

        private static ApiResponse<T> Deserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<ApiResponse<T>>(json);
        }
    }
}
