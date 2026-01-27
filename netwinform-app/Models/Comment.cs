using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class Comment
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("poll_id")]
        public string PollId { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
    }
}
