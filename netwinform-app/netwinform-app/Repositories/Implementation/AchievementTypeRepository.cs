using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Helpers;
using netwinform_app.Models;
using netwinform_app.Repositories.Interfaces;
using Newtonsoft.Json;

namespace netwinform_app.Repositories.Implementation
{
    public class AchievementTypeRepository : IAchievementTypeRepository
    {
        private const string Endpoint = "achievement-types";
        private readonly HttpClient _httpClient;

        public AchievementTypeRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ApiResponse<List<AchievementType>>> GetAllAsync()
        {
            var request = BuildAuthRequest(HttpMethod.Get, Endpoint);
            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<List<AchievementType>>(body);
        }

        public async Task<ApiResponse<AchievementType>> GetByIdAsync(string id)
        {
            var request = BuildAuthRequest(HttpMethod.Get, $"{Endpoint}/{id}");
            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<AchievementType>(body);
        }

        public async Task<ApiResponse<AchievementType>> CreateAsync(CreateAchievementTypeDto dto)
        {
            var request = BuildAuthRequest(HttpMethod.Post, Endpoint);
            request.Content = BuildMultipartContent(
                dto.Code, dto.Name, dto.Description,
                dto.RequirementType, dto.RequirementValue,
                dto.IconFilePath);

            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<AchievementType>(body);
        }

        public async Task<ApiResponse<AchievementType>> UpdateAsync(string id, UpdateAchievementTypeDto dto)
        {
            // Laravel typically needs _method=PUT for multipart
            var request = BuildAuthRequest(HttpMethod.Post, $"{Endpoint}/{id}");
            var content = BuildMultipartContent(
                dto.Code, dto.Name, dto.Description,
                dto.RequirementType, dto.RequirementValue,
                dto.IconFilePath);
            content.Add(new StringContent("PUT"), "_method");   // Laravel method spoofing
            request.Content = content;

            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();
            return Deserialize<AchievementType>(body);
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
                request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {token}");

            return request;
        }

        private static MultipartFormDataContent BuildMultipartContent(
            string code, string name, string description,
            string requirementType, int requirementValue,
            string iconFilePath)
        {
            var form = new MultipartFormDataContent();
            form.Add(new StringContent(code ?? string.Empty), "code");
            form.Add(new StringContent(name ?? string.Empty), "name");
            form.Add(new StringContent(description ?? string.Empty), "description");
            form.Add(new StringContent(requirementType ?? string.Empty), "requirement_type");
            form.Add(new StringContent(requirementValue.ToString()), "requirement_value");

            if (!string.IsNullOrEmpty(iconFilePath) && File.Exists(iconFilePath))
            {
                var fileBytes = File.ReadAllBytes(iconFilePath);
                var fileContent = new ByteArrayContent(fileBytes);
                fileContent.Headers.ContentType =
                    MediaTypeHeaderValue.Parse(GetMimeType(iconFilePath));
                form.Add(fileContent, "icon", Path.GetFileName(iconFilePath));
            }

            return form;
        }

        private static string GetMimeType(string filePath)
        {
            var ext = Path.GetExtension(filePath).ToLowerInvariant();
            switch (ext)
            {
                case ".jpg":
                case ".jpeg": return "image/jpeg";
                case ".png": return "image/png";
                case ".gif": return "image/gif";
                case ".webp": return "image/webp";
                default: return "application/octet-stream";
            }
        }

        private static ApiResponse<T> Deserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<ApiResponse<T>>(json);
        }
    }
}
