﻿using Projeto_Lucas.Domain.Entities;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.IContratos.Services
{
    public interface IProdutosClienteService
    {
        IEnumerable<ProdutoCliente> TodosProdutosCliente();
        ProdutoCliente ProdutoClientePorId(int id);
        string InserirProdutoCliente(ProdutoCliente produtoCliente);
        //string DeletarProduto(int id);
        string EditarProdutoCliente(ProdutoCliente produtoCliente);
    }
}
