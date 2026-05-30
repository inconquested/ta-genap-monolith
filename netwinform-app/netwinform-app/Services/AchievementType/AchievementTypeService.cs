using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Repositories.Interfaces;

namespace netwinform_app.Services.AchievementType
{
    public class AchievementTypeService : IAchievementTypeService
    {
        private readonly IAchievementTypeRepository _repository;

        public AchievementTypeService(IAchievementTypeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Models.AchievementType>> GetAllAsync()
        {
            var response = await _repository.GetAllAsync();
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to fetch achievement types.");
            return response.Data;
        }

        public async Task<Models.AchievementType> GetByIdAsync(string id)
        {
            var response = await _repository.GetByIdAsync(id);
            if (!response.Success)
                throw new Exception(response.Message ?? $"Achievement type {id} not found.");
            return response.Data;
        }

        public async Task<Models.AchievementType> CreateAsync(CreateAchievementTypeDto dto)
        {
            ValidateDto(dto.Code, dto.Name);

            var response = await _repository.CreateAsync(dto);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to create achievement type.");
            return response.Data;
        }

        public async Task<Models.AchievementType> UpdateAsync(string id, UpdateAchievementTypeDto dto)
        {
            ValidateDto(dto.Code, dto.Name);

            var response = await _repository.UpdateAsync(id, dto);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to update achievement type.");
            return response.Data;
        }

        public async Task DeleteAsync(string id)
        {
            var response = await _repository.DeleteAsync(id);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to delete achievement type.");
        }

        private static void ValidateDto(string code, string name)
        {
            if (string.IsNullOrWhiteSpace(code))
                throw new ArgumentException("Code is required.");
            if (code.Length < 2 || code.Length > 16)
                throw new ArgumentException("Code must be between 2 and 16 characters.");
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name is required.");
        }
    }
}
