using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Projeto_Lucas.Domain.Entities;

namespace Projeto_Lucas.Infrastructure.Mapping
{
    public class ProdutoMap : BaseMap<Produto>
    {
        public ProdutoMap(EntityTypeBuilder<Produto> entityBuilder) 
            : base("Produtos", entityBuilder)
        {
            entityBuilder.Property(x => x.Titulo)
                         .HasMaxLength(50)
                         .IsRequired();

            entityBuilder.Property(x => x.Valor)
                         .IsRequired();

            entityBuilder.Property(x => x.Qtde)
                         .IsRequired();
        }
    }
}
