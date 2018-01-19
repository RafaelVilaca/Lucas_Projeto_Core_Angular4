using Microsoft.AspNetCore.Mvc;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Services;
using System;
using System.Web.Http.Cors;

namespace Projeto_Lucas.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("api/")]
    public class ProdutosClienteController : Controller
    {
        private readonly IProdutosClienteService _produtosClienteService;

        public ProdutosClienteController(IProdutosClienteService produtosClienteService) => _produtosClienteService = produtosClienteService;

        [HttpGet]
        [Route("produtosCliente")]
        public IActionResult TodosProdutos()
        {
            try
            {
                return Ok(_produtosClienteService.TodosProdutosCliente());
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar Produtos dos clientes: " + e.Message);
            }
        }

        [HttpGet]
        [Route("produtosCliente/{id}")]
        public IActionResult ProdutoClientePorId(int id)
        {
            try
            {
                return Ok(_produtosClienteService.ProdutoClientePorId(id));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar dados do Produto dos clientes: " + e.Message);
            }
        }

        [HttpPost]
        [Route("produtosCliente")]
        public IActionResult InserirProdutoCliente([FromBody] ProdutoCliente produtoCliente)
        {
            try
            {
                return Ok(_produtosClienteService.InserirProdutoCliente(produtoCliente));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Inserir Produto do cliente: " + e.Message);
            }
        }

        [HttpPut]
        [Route("produtosCliente")]
        public IActionResult EditarProdutoCliente([FromBody] ProdutoCliente produtoCliente)
        {
            try
            {
                return Ok(_produtosClienteService.EditarProdutoCliente(produtoCliente));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Editar Produto do cliente: " + e.Message);
            }
        }

        //[HttpDelete]
        //[Route("produtosCliente/{id}")]
        //public IActionResult DeletarProduto(int id)
        //{
        //    try
        //    {
        //        return Ok(_produtoService.DeletarProduto(id));
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest("Falha ao Deletar Produto: " + e.Message);
        //    }
        //}
    }
}