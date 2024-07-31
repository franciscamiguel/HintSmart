using System.Text.Json.Serialization;

namespace SmartHint.ViewModels
{
    public class ClientDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("nome_razao")]
        public string Nome { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("senha")]
        public string Senha { get; set; }

        [JsonPropertyName("telefone")]
        public string Telefone { get; set; }

        [JsonIgnore]
        public DateTime DataCadastro { get; set; }

        [JsonPropertyName("tipoPessoa")]
        public int Tipo { get; set; }

        [JsonPropertyName("cpf_cnpj")]
        public string CpfCnpj { get; set; }

        [JsonPropertyName("inscricao_estadual")]
        public string InscricaoEstadual { get; set; }

        [JsonPropertyName("genero")]
        public int Genero { get; set; }

        [JsonPropertyName("data_nascimento")]
        public DateTime? DataNascimento { get; set; }

        [JsonPropertyName("bloqueado")]
        public bool Bloqueado { get; set; }
    }
}
