using System;

namespace Projeto_Lucas.Domain.Entities
{
    public class ProdutoCliente
    {
        public int Id { get; set; }
        public DateTime DataCadastro { get; set; }
        public int Qtde { get; set; }
        public int IdCliente { get; set; }
        public virtual Cliente Cliente { get; set; }
        public int IdProduto { get; set; }
        public virtual Produto Produto { get; set; }
    }
}
