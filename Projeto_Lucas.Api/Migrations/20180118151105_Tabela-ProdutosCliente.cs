using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Projeto_Lucas.Api.Migrations
{
    public partial class TabelaProdutosCliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Qtde",
                table: "Produtos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProdutoCliente",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataCadastro = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    IdCliente = table.Column<int>(nullable: false),
                    IdProduto = table.Column<int>(nullable: false),
                    Qtde = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdutoCliente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProdutoCliente_Clientes_IdCliente",
                        column: x => x.IdCliente,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProdutoCliente_Produtos_IdProduto",
                        column: x => x.IdProduto,
                        principalTable: "Produtos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProdutoCliente_IdCliente",
                table: "ProdutoCliente",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_ProdutoCliente_IdProduto",
                table: "ProdutoCliente",
                column: "IdProduto");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProdutoCliente");

            migrationBuilder.DropColumn(
                name: "Qtde",
                table: "Produtos");
        }
    }
}
