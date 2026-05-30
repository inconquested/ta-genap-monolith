using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Models;

namespace netwinform_app.Repositories.Interfaces
{
    public interface IPollCategoryRepository
    {
        Task<ApiResponse<List<PollCategory>>> GetAllAsync();
        Task<ApiResponse<PollCategory>> GetByIdAsync(string id);
        Task<ApiResponse<PollCategory>> CreateAsync(CreatePollCategoryDto dto);
        Task<ApiResponse<PollCategory>> UpdateAsync(string id, UpdatePollCategoryDto dto);
        Task<ApiResponse<object>> DeleteAsync(string id);
    }
}
