using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace netwinform_app.Models
{
    public class UserAchievement
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("achievement_type_id")]
        public string AchievementTypeId { get; set; }
        [JsonProperty("earned_at")]
        public string AchievementType { get; set; }
        [JsonProperty("progress_data")]
        public JObject ProgressData { get; set; }
    }
}
