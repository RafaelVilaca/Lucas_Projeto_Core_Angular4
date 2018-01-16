using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Projeto_Lucas.Domain.Entities;

namespace Projeto_Lucas.Infrastructure.Mapping
{
    public class ClienteMap : BaseMap<Cliente>
    {
        public ClienteMap(EntityTypeBuilder<Cliente> entityBuilder) 
            : base("Clientes", entityBuilder)
        {
            entityBuilder.Property(x => x.CPF)
                         .IsRequired();

            entityBuilder.Property(x => x.Nome)
                         .HasMaxLength(80)
                         .IsRequired();

            entityBuilder.Property(x => x.Email)
                         .HasMaxLength(150);

            entityBuilder.Property(x => x.Endereco)
                         .HasMaxLength(150);            
        }
    }
}
