using System.Collections.Generic;

namespace Projeto_Lucas.Domain.Entities
{
    public class Produto : BaseEntity
    {
        public decimal Valor { get; set; }
        public int Qtde { get; set; }
        public string Titulo { get; set; }

        public virtual ICollection<ProdutoCliente> ProdutosClientes { get; set; }
    }
}
