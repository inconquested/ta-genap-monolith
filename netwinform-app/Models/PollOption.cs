using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class PollOption
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("poll_id")]
        public string PollId { get; set; }
        [JsonProperty("display_order")]
        public int DisplayOrder { get; set; }
        [JsonProperty("option_text")]
        public string OptionText { get; set; }
    }
}
