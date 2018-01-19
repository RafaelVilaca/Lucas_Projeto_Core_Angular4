using System;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.Entities
{
    public class Cliente : BaseEntity
    {
        public string Nome { get; set; }
        public DateTime Nascimento { get; set; }
        public decimal CPF { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }

        public virtual ICollection<ProdutoCliente> ProdutosClientes { get; set; }
    }
}
