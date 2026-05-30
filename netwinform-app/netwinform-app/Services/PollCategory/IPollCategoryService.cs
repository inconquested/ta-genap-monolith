using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using netwinform_app.DTOs;

namespace netwinform_app.Services.PollCategory
{
    public interface IPollCategoryService
    {
        Task<List<Models.PollCategory>> GetAllAsync();
        Task<Models.PollCategory> GetByIdAsync(string id);
        Task<Models.PollCategory> CreateAsync(CreatePollCategoryDto dto);
        Task<Models.PollCategory> UpdateAsync(string id, UpdatePollCategoryDto dto);
        Task DeleteAsync(string id);
    }
}
