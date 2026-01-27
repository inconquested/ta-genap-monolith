using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.Models
{
    public class WinnerOption
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("poll_option_id")]
        public string PollOptionId { get; set; }
        [JsonProperty("option_id")]
        public string OptionId { get; set; }
    }
}
