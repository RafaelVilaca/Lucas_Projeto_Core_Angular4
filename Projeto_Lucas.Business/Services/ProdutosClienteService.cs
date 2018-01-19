using System.Collections.Generic;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Services;
using Projeto_Lucas.Domain.IContratos.Repository;

namespace Projeto_Lucas.Business.Services
{
    public class ProdutosClienteService : IProdutosClienteService
    {
        private readonly IProdutosClienteRepository _produtosClienteRepositorio;

        public ProdutosClienteService(IProdutosClienteRepository produtosClienteRepositorio)
        {
            _produtosClienteRepositorio = produtosClienteRepositorio;
        }

        public string EditarProdutoCliente(ProdutoCliente produtoCliente)
        {
            var response = _produtosClienteRepositorio.EditarProdutoCliente(produtoCliente);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public string InserirProdutoCliente(ProdutoCliente produtoCliente)
        {
            var response = _produtosClienteRepositorio.InserirProdutoCliente(produtoCliente);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public ProdutoCliente ProdutoClientePorId(int id)
        {
            return _produtosClienteRepositorio.ProdutoClientePorId(id);
        }

        public IEnumerable<ProdutoCliente> TodosProdutosCliente()
        {
            return _produtosClienteRepositorio.TodosProdutosCliente();
        }
    }
}
