using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SmartHint.Models
{
    [Table("genero")]
    public class Gender
    {
        [Column("id"), DataMember(Name = "id")]
        public int Id { get; set; }

        [Column("nome"), DataMember(Name = "nome")]
        public string Nome { get; set; }

        [JsonIgnore]
        public Client Client { get; set; }
    }
}
