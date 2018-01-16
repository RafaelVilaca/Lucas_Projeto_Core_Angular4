using Microsoft.AspNetCore.Mvc;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Services;
using System;
using System.Web.Http.Cors;

namespace Projeto_Lucas.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("api/")]
    public class ClienteController : Controller
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService) => _clienteService = clienteService;

        [HttpGet]
        [Route("clientes")]
        public IActionResult TodosClientes()
        {
            try
            {
                return Ok(_clienteService.TodosClientes());
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar Clientes: " + e.Message);
            }
        }

        [HttpGet]
        [Route("cliente/{id}")]
        public IActionResult ClientePorId(int id)
        {
            try
            {
                return Ok(_clienteService.ClientePorId(id));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar dados do Cliente: " + e.Message);
            }
        }

        [HttpPost]
        [Route("cliente")]
        public IActionResult InserirCliente([FromBody] Cliente cliente)
            {
            try
            {               
                return Ok(_clienteService.InserirCliente(cliente));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Inserir Cliente: " + e.Message);
            }
        }

        [HttpPut]
        [Route("cliente")]
        public IActionResult EditarCliente([FromBody] Cliente cliente)
        {
            try
            {     
                return Ok(_clienteService.EditarCliente(cliente));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Editar Cliente: " + e.Message);
            }
        }

        [HttpDelete]
        [Route("cliente/{id}")]
        public IActionResult DeletarCliente(int id)
        {
            try
            {                
                return Ok(_clienteService.DeletarCliente(id));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Deletar Cliente: " + e.Message);
            }
        }
    }
}