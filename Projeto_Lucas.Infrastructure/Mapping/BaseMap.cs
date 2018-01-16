using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Projeto_Lucas.Domain.Entities;
using System;

namespace Projeto_Lucas.Infrastructure.Mapping
{
    public class BaseMap<T> where T : BaseEntity 
    {
        public BaseMap(string tableName, EntityTypeBuilder<T> entityBuilder)
        {
            entityBuilder.ToTable(tableName);

            entityBuilder.HasKey(x => x.Id);

            entityBuilder.Property(x => x.Id)
                             .ValueGeneratedOnAdd();

            entityBuilder.Property(x => x.Ativo)
                             .HasDefaultValue(true);

            entityBuilder.Property(x => x.DataCadastro)
                         .HasDefaultValueSql("getdate()");
        }        
    }
}
