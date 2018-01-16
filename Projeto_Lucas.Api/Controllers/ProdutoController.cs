using Microsoft.AspNetCore.Mvc;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Services;
using System;
using System.Web.Http.Cors;

namespace Projeto_Lucas.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("api/")]
    public class ProdutoController : Controller
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService) => _produtoService = produtoService;

        [HttpGet]
        [Route("produtos")]
        public IActionResult TodosProdutos()
        {
            try
            {
                return Ok(_produtoService.TodosProdutos());
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar Produtos: " + e.Message);
            }
        }

        [HttpGet]
        [Route("produto/{id}")]
        public IActionResult ProdutoPorId(int id)
        {
            try
            {
                return Ok(_produtoService.ProdutoPorId(id));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao buscar dados do Produto: " + e.Message);
            }
        }

        [HttpPost]
        [Route("produto")]
        public IActionResult InserirProduto([FromBody] Produto produto)

        {
            try
            {                
                return Ok(_produtoService.InserirProduto(produto));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Inserir Produto: " + e.Message);
            }
        }

        [HttpPut]
        [Route("produto")]
        public IActionResult EditarProduto([FromBody] Produto produto)
        {
            try
            {                
                return Ok(_produtoService.EditarProduto(produto));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Editar Produto: " + e.Message);
            }
        }

        [HttpDelete]
        [Route("produto/{id}")]
        public IActionResult DeletarProduto(int id)
        {
            try
            {                
                return Ok(_produtoService.DeletarProduto(id));
            }
            catch (Exception e)
            {
                return BadRequest("Falha ao Deletar Produto: " + e.Message);
            }
        }
    }
}