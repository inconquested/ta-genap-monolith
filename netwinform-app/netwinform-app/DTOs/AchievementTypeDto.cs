using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace netwinform_app.DTOs
{
    // Used for multipart/form-data — not serialized to JSON directly.
    // Fields are sent as string parts; icon is a file part.
    public class CreateAchievementTypeDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string RequirementType { get; set; }
        public int RequirementValue { get; set; }

        // Full local file path; null = no icon
        public string IconFilePath { get; set; }
    }

    public class UpdateAchievementTypeDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string RequirementType { get; set; }
        public int RequirementValue { get; set; }

        // Full local file path; null = keep existing icon
        public string IconFilePath { get; set; }
    }
}
