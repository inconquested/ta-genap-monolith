using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;
using netwinform_app.Models;

namespace netwinform_app.Services.AchievementType
{
    public interface IAchievementTypeService
    {
        Task<List<Models.AchievementType>> GetAllAsync();
        Task<Models.AchievementType> GetByIdAsync(string id);
        Task<Models.AchievementType> CreateAsync(CreateAchievementTypeDto dto);
        Task<Models.AchievementType> UpdateAsync(string id, UpdateAchievementTypeDto dto);
        Task DeleteAsync(string id);
    }
}
