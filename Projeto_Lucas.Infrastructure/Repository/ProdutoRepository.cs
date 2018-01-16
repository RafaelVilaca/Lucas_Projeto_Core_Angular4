using Microsoft.EntityFrameworkCore;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Projeto_Lucas.Infrastructure.Repository
{
    public class ProdutoRepository : IProdutoRepository
    {
        private Projeto_LucasContext _context;
        public ProdutoRepository(Projeto_LucasContext produtoContext) => _context = produtoContext;

        public Produto ProdutoPorId(int id)
        {
            return _context.Produtos.Find(id);
        }

        public string DeletarProduto(int id)
        {
            Produto produto = _context.Produtos.Find(id);
            _context.Produtos.Remove(produto);
            Salvar();
            return produto.Titulo;
        }

        public string EditarProduto(Produto produto)
        {
            _context.Entry(produto).State = EntityState.Modified;
            Salvar();
            return produto.Titulo;
        }

        public string InserirProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            Salvar();
            return produto.Titulo;
        }

        public IEnumerable<Produto> TodosProdutos()
        {
            return _context.Produtos.ToList().OrderBy(x => x.Titulo);
        }

        public void Salvar()
        {
            _context.SaveChanges();
        }
    }
}
