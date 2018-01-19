using Projeto_Lucas.Domain.Entities;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.IContratos.Repository
{
    public interface IProdutosClienteRepository
    {
        IEnumerable<ProdutoCliente> TodosProdutosCliente();
        ProdutoCliente ProdutoClientePorId(int id);
        string InserirProdutoCliente(ProdutoCliente produtoCliente);
        //string DeletarProduto(int id);
        string EditarProdutoCliente(ProdutoCliente produtoCliente);
    }
}
