using Microsoft.EntityFrameworkCore;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Infrastructure.Mapping;
using System;
using System.Data.SqlClient;

namespace Projeto_Lucas.Infrastructure
{
    public class Projeto_LucasContext : DbContext
    {
        public Projeto_LucasContext(DbContextOptions<Projeto_LucasContext> options)
            : base(options)
        { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ProdutoCliente> ProdutosCliente { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new ClienteMap(modelBuilder.Entity<Cliente>());
            new ProdutoMap(modelBuilder.Entity<Produto>());
            new ProdutoClienteMap(modelBuilder.Entity<ProdutoCliente>());

            base.OnModelCreating(modelBuilder);
        }

        private SqlCommand Command { get; set; }

        protected void ExecuteNonQuery()
        {
            Command.ExecuteNonQuery();
        }

        protected SqlDataReader ExecuteReader()
        {
            return Command.ExecuteReader();
        }
    }

    //public class Projeto_LucasContextInitializer : DropCreateDatabaseIfModelChanges<Projeto_LucasContext>
    //{
    //    protected override void Seed(Projeto_LucasContext context)
    //    {
    //        context.Clientes.Add(new Cliente { Nome = "Lucas", Nascimento = new DateTime(26 / 12 / 1990), CPF = 00000000000, Email = "teste@gmail.com", Endereco = "Rua dos Testes, Franca-SP, 121", Ativo = true });
    //        context.Clientes.Add(new Cliente { Nome = "Rafael", Nascimento = new DateTime(26 / 12 / 1990), CPF = 00000000000, Email = "teste@gmail.com", Endereco = "Rua dos Testes, Franca-SP, 121", Ativo = true });
    //        context.SaveChanges();

    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 10.50M, Titulo = "Mouse" });
    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 20.50M, Titulo = "Teclado" });
    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 60.50M, Titulo = "Monitor" });
    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 10.70M, Titulo = "God of War" });
    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 15.50M, Titulo = "Metal Gear" });
    //        context.Produtos.Add(new Produto { Ativo = true, Valor = 10.80M, Titulo = "Last of Us" });
    //        context.SaveChanges();

    //        base.Seed(context);
    //    }
    //}
}
