using System;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace netwinform_app.Models
{
    public class Vote
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("poll_id")] 
        public string PollId { get; set; }
        [JsonProperty("option_id")]
        public string OptionId { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("voted_at")]
        public string VotedAt { get; set; }
    }
}
