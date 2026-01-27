using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class Poll
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("creator_id")]
        public string CreatorId { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("start_date")]
        public string StartDate { get; set; }
        [JsonProperty("end_date")]
        public string EndDate { get; set; }
        [JsonProperty("is_finalized")]
        public bool IsFinalized { get; set; }
        [JsonProperty("is_active")]
        public bool IsActive { get; set; }
        [JsonProperty("allow_comments")]
        public bool AllowComments {get; set;}
    }
}
