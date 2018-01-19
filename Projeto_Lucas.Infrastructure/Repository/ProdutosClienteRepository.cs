using Projeto_Lucas.Domain.IContratos.Repository;
using System.Collections.Generic;
using Projeto_Lucas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Projeto_Lucas.Infrastructure.Repository
{
    public class ProdutosClienteRepository : IProdutosClienteRepository
    {
        private Projeto_LucasContext _context;
        public ProdutosClienteRepository(Projeto_LucasContext produtoContext) => _context = produtoContext;

        public ProdutoCliente ProdutoClientePorId(int id)
        {
            return _context.ProdutosCliente.Find(id);
        }

        public string EditarProdutoCliente(ProdutoCliente produtoCliente)
        {
            _context.Entry(produtoCliente).State = EntityState.Modified;
            Salvar();
            return produtoCliente.Produto.Titulo;
        }

        public string InserirProdutoCliente(ProdutoCliente produtoCliente)
        {
            _context.ProdutosCliente.Add(produtoCliente);
            Salvar();
            return produtoCliente.Produto.Titulo;
        }

        public IEnumerable<ProdutoCliente> TodosProdutosCliente()
        {
            return _context.ProdutosCliente.ToList().OrderBy(x => x.Cliente.Nome);
        }

        public void Salvar()
        {
            _context.SaveChanges();
        }
    }
}
