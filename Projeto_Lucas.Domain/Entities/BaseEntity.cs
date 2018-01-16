using System;

namespace Projeto_Lucas.Domain.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
