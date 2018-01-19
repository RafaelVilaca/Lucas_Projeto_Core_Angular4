using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Projeto_Lucas.Domain.Entities;

namespace Projeto_Lucas.Infrastructure.Mapping
{
    public class ProdutoClienteMap 
    {
        public ProdutoClienteMap(EntityTypeBuilder<ProdutoCliente> entityBuilder) 
        {
            entityBuilder.ToTable("ProdutoCliente");

            entityBuilder.HasKey(x => x.Id);

            entityBuilder.Property(x => x.Id)
                             .ValueGeneratedOnAdd();

            entityBuilder.Property(x => x.DataCadastro)
                         .HasDefaultValueSql("getdate()");

            entityBuilder.Property(x => x.Qtde)
                         .IsRequired();

            entityBuilder.Property(x => x.IdCliente)
                         .IsRequired();

            entityBuilder.HasOne(x => x.Cliente)
                .WithMany(x => x.ProdutosClientes)
                .HasForeignKey(x => x.IdCliente);

            entityBuilder.HasOne(x => x.Produto)
                .WithMany(x => x.ProdutosClientes)
                .HasForeignKey(x => x.IdProduto);

            entityBuilder.Property(x => x.IdCliente)
                         .IsRequired();

            entityBuilder.Property(x => x.IdProduto)
                         .IsRequired();
        }
    }
}
