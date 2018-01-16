using Projeto_Lucas.Domain.Entities;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.IContratos.Repository
{
    public interface IProdutoRepository
    {
        IEnumerable<Produto> TodosProdutos();
        Produto ProdutoPorId(int id);
        string InserirProduto(Produto produto);
        string DeletarProduto(int id);
        string EditarProduto(Produto produto);
    }
}
