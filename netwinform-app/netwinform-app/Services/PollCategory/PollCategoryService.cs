using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Repositories.Interfaces;

namespace netwinform_app.Services.PollCategory
{
    public class PollCategoryService : IPollCategoryService
    {
        private readonly IPollCategoryRepository _repository;

        public PollCategoryService(IPollCategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Models.PollCategory>> GetAllAsync()
        {
            var response = await _repository.GetAllAsync();
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to fetch poll categories.");
            return response.Data;
        }

        public async Task<Models.PollCategory> GetByIdAsync(string id)
        {
            var response = await _repository.GetByIdAsync(id);
            if (!response.Success)
                throw new Exception(response.Message ?? $"Poll category {id} not found.");
            return response.Data;
        }

        public async Task<Models.PollCategory> CreateAsync(CreatePollCategoryDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Label))
                throw new ArgumentException("Label is required.");
            if (dto.Label.Length > 255)
                throw new ArgumentException("Label cannot exceed 255 characters.");

            var response = await _repository.CreateAsync(dto);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to create poll category.");
            return response.Data;
        }

        public async Task<Models.PollCategory> UpdateAsync(string id, UpdatePollCategoryDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Label))
                throw new ArgumentException("Label is required.");
            if (dto.Label.Length > 255)
                throw new ArgumentException("Label cannot exceed 255 characters.");

            var response = await _repository.UpdateAsync(id, dto);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to update poll category.");
            return response.Data;
        }

        public async Task DeleteAsync(string id)
        {
            var response = await _repository.DeleteAsync(id);
            if (!response.Success)
                throw new Exception(response.Message ?? "Failed to delete poll category.");
        }
    }
}
