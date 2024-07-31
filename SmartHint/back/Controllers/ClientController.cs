using Microsoft.AspNetCore.Mvc;
using SmartHint.DAL;
using SmartHint.Extensions;
using SmartHint.Models;
using SmartHint.ViewModels;

namespace SmartHint.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;

        public ClientController(ILogger<ClientController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetClients")]
        public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
        {
            try
            {
                var clients = await ClientDAL.GetClientsAsync(pageParams);
                if (clients == null) return NoContent();

                Response.AddPagination(clients.CurrentPage, clients.PageSize, clients.TotalCount, clients.TotalPages);

                return Ok(clients);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar clientes. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("GetClients/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                Client? cl = await ClientDAL.GetClientByIdAsync(id);

                if (cl == null) return NoContent();

                return Ok(cl);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar cliente pelo id. Erro: {ex.Message}"
                );
            }
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Post([FromBody] ClientDto client)
        {
            try
            {
                if (client == null) return NoContent();

                Client? cl = await ClientDAL.UpSertClientAsync(client);

                if (cl == null) return NoContent();

                return Ok(cl);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar criar cliente. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("GetPersonTypes")]
        public async Task<IActionResult> GetPersonTypes()
        {
            try
            {
                List<PersonType>? ps = await ClientDAL.GetPersonTypesAsync();

                if (ps == null) return NoContent();

                return Ok(ps);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar tipos de pessoas. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("GetGenders")]
        public async Task<IActionResult> GetGendersAsync()
        {
            try
            {
                List<Gender>? gs = await ClientDAL.GetGendersAsync();

                if (gs == null) return NoContent();

                return Ok(gs);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar gêneros. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("VerifyEmail")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string email, [FromQuery] int id)
        {
            try
            {
                return Ok(await ClientDAL.VerifyEmail(email, id));
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar gêneros. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet("VerifyCpfCnpj")]
        public async Task<IActionResult> VerifyCpfCnpj([FromQuery] string cpf_cnpj, [FromQuery] int id)
        {
            try
            {
                return Ok(await ClientDAL.VerifyCpfCnpj(cpf_cnpj, id));
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar listar gêneros. Erro: {ex.Message}"
                );
            }
        }
    }
}