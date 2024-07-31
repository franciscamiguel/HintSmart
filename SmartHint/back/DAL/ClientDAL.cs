using Microsoft.EntityFrameworkCore;
using SmartHint.Enums;
using SmartHint.Models;
using SmartHint.ViewModels;
using System.Globalization;

namespace SmartHint.DAL
{
    public class ClientDAL
    {
        public static async Task<PageList<Client>> GetClientsAsync(PageParams pageParams)
        {
            using var conn = new SmartHintContext();

            IQueryable<Client> query = conn.Clients;

            DateTime.TryParseExact(pageParams.Term, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dt);

            if (!string.IsNullOrEmpty(pageParams.Term))
            {
                query = query.AsNoTracking()
                             .Where(cl =>
                                (
                                    cl.Nome.ToLower().Contains(pageParams.Term.ToLower()) ||
                                    cl.Email.ToLower().Contains(pageParams.Term.ToLower()) ||
                                    cl.Telefone.ToLower().Contains(pageParams.Term.ToLower()) ||
                                    cl.DataCadastro.Date.Equals(dt.Date)
                                ))
                             .OrderBy(cl => cl.Id);
            }

            return await PageList<Client>.CreateAsync(query, pageParams.PageNumber, pageParams.pageSize);
        }

        public static async Task<Client?> GetClientByIdAsync(int id)
        {
            using var conn = new SmartHintContext();

            return await conn.Clients.FirstOrDefaultAsync(c => c.Id == id);
        }

        public static async Task<Client?> UpSertClientAsync(ClientDto client)
        {
            using var conn = new SmartHintContext();
            var transaction = conn.Database.BeginTransaction();
            Client? cl;

            try
            {
                cl = await conn.Clients.FirstOrDefaultAsync(cl => cl.Id == client.Id);

                if (cl == null)
                {
                    cl = new Client
                    {
                        Id = client.Id,
                        Nome = client.Nome,
                        Email = client.Email,
                        Senha = client.Senha,
                        Telefone = client.Telefone,
                        Tipo = client.Tipo,
                        CpfCnpj = client.CpfCnpj,
                        DataCadastro = DateTime.Now,
                        Bloqueado = false
                    };

                    if (cl.Tipo == (int)TipoPessoa.PessoaFisica)
                    {
                        cl.Genero = client.Genero;
                        cl.DataNascimento = client.DataNascimento;
                    }
                    else if (cl.Tipo == (int)TipoPessoa.PessoaJuridica)
                    {
                        cl.InscricaoEstadual = client.InscricaoEstadual;
                    }

                    conn.Clients.Add(cl);
                }
                else
                {
                    cl.Nome = client.Nome;
                    cl.Email = client.Email;
                    cl.Senha = client.Senha;
                    cl.Telefone = client.Telefone;
                    cl.Tipo = client.Tipo;
                    cl.CpfCnpj = client.CpfCnpj;
                    cl.Bloqueado = client.Bloqueado;

                    if (cl.Tipo == (int)TipoPessoa.PessoaFisica)
                    {
                        cl.Genero = client.Genero;
                        cl.DataNascimento = client.DataNascimento;
                    }
                    else if (cl.Tipo == (int)TipoPessoa.PessoaJuridica)
                    {
                        cl.InscricaoEstadual = client.InscricaoEstadual;
                    }
                }

                await conn.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }

            return cl;
        }

        public static async Task<List<PersonType>?> GetPersonTypesAsync()
        {
            using var conn = new SmartHintContext();

            return await conn.PersonTypes.ToListAsync();
        }

        public static async Task<List<Gender>?> GetGendersAsync()
        {
            using var conn = new SmartHintContext();

            return await conn.Genders.ToListAsync();
        }

        public static async Task<bool> VerifyEmail(string email, int id)
        {
            using var conn = new SmartHintContext();

            return await conn.Clients.AnyAsync(cl => cl.Email.Trim().Equals(email) && cl.Id != id);
        }

        public static async Task<bool> VerifyCpfCnpj(string cpf_cnpj, int id)
        {
            using var conn = new SmartHintContext();

            return await conn.Clients.AnyAsync(cl => cl.CpfCnpj.Trim().Equals(cpf_cnpj) && cl.Id != id);
        }
    }
}
