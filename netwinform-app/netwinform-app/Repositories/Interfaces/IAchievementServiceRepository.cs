using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Models;

namespace netwinform_app.Repositories.Interfaces
{
    public interface IAchievementTypeRepository
    {
        Task<ApiResponse<List<AchievementType>>> GetAllAsync();
        Task<ApiResponse<AchievementType>> GetByIdAsync(string id);
        Task<ApiResponse<AchievementType>> CreateAsync(CreateAchievementTypeDto dto);
        Task<ApiResponse<AchievementType>> UpdateAsync(string id, UpdateAchievementTypeDto dto);
        Task<ApiResponse<object>> DeleteAsync(string id);
    }
}
