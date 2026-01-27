using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace netwinform_app.Models
{
    public class VoteAuditLog
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("action")]
        public string Action { get; set; }
        [JsonProperty("vote_id")]
        public string VoteId { get; set; }
        [JsonProperty("performed_by_user_id")]
        public string PerformedByUserId { get; set; }
        [JsonProperty("performed_by_user_ip")]
        public string PerformedByUserIp { get; set; }
        [JsonProperty("user_agent")]
        public string UserAgent { get; set; }
        [JsonProperty("old_values")]
        public JObject OldValues { get; set; }
        [JsonProperty("new_values")]
        public JObject NewValues { get; set; }
        [JsonProperty("poll_id")]
        public string PollId { get; set; }
        [JsonProperty("option_id")]
        public string OptionId {  get; set; }
    }
}
