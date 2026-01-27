using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class PollResult
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("poll_id")]
        public string PollId { get; set; }

        [JsonProperty("is_draw")]
        public bool IsDraw { get; set; }

        [JsonProperty("total_votes")]
        public string TotalVotes { get; set; }
    }
}
