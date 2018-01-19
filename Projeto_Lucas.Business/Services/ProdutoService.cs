using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Repository;
using Projeto_Lucas.Domain.IContratos.Services;
using System.Collections.Generic;

namespace Projeto_Lucas.Business.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepositorio;

        public ProdutoService(IProdutoRepository produtoRepositorio)
        {
            _produtoRepositorio = produtoRepositorio;
        }

        public string DeletarProduto(int id)
        {            
            var response = _produtoRepositorio.DeletarProduto(id);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public string EditarProduto(Produto produto)
        {            
            var response = _produtoRepositorio.EditarProduto(produto);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public string InserirProduto(Produto produto)
        {            
            var response = _produtoRepositorio.InserirProduto(produto);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public Produto ProdutoPorId(int id)
        {
            return _produtoRepositorio.ProdutoPorId(id);
        }

        public IEnumerable<Produto> TodosProdutos()
        {
            return _produtoRepositorio.TodosProdutos();
        }
    }
}
