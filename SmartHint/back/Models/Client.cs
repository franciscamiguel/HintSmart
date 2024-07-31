using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartHint.Models
{
    [Table("cliente")]
    public class Client
    {
        [Column("id"), JsonPropertyName("id")]
        public int Id { get; set; }

        [Column("nome_razao"), JsonPropertyName("nome_razao")]
        public string Nome { get; set; }

        [Column("email"), JsonPropertyName("email")]
        public string Email { get; set; }

        [Column("senha"), JsonPropertyName("senha")]
        public string Senha { get; set; }

        [Column("telefone"), JsonPropertyName("telefone")]
        public string Telefone { get; set; }

        [Column("data_cadastro"), JsonPropertyName("data_cadastro")]
        public DateTime DataCadastro { get; set; }

        [Column("tipo"), JsonPropertyName("tipoPessoa")]
        public int Tipo { get; set; }

        [Column("cpf_cnpj"), JsonPropertyName("cpf_cnpj")]
        public string CpfCnpj { get; set; }

        [Column("inscricao_estadual"), JsonPropertyName("inscricao_estadual")]
        public string? InscricaoEstadual { get; set; }

        [Column("genero"), JsonPropertyName("genero")]
        public int? Genero { get; set; }

        [Column("data_nascimento"), JsonPropertyName("data_nascimento")]
        public DateTime? DataNascimento { get; set; }

        [Column("bloqueado"), JsonPropertyName("bloqueado")]
        public bool Bloqueado { get; set; }

        [JsonIgnore]
        public PersonType? PersonType { get; set; }

        [JsonIgnore]
        public Gender? Gender { get; set; }

    }
}
