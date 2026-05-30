using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace netwinform_app.DTOs
{
    public class CreatePollCategoryDto
    {
        [JsonProperty("label")]
        public string Label { get; set; }
    }

    public class UpdatePollCategoryDto
    {
        [JsonProperty("label")]
        public string Label { get; set; }
    }
}
