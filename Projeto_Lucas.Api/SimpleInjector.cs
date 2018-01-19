using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Projeto_Lucas.Business.Services;
using Projeto_Lucas.Domain.IContratos.Repository;
using Projeto_Lucas.Domain.IContratos.Services;
using Projeto_Lucas.Infrastructure;
using Projeto_Lucas.Infrastructure.Repository;

namespace Projeto_Lucas.Api
{
    public static class SimpleInjector
    {
        public static void Register(IServiceCollection service, IConfiguration Configuration)
        {
            service.AddTransient<IClienteService, ClienteService>();
            service.AddTransient<IClienteRepository, ClienteRepository>();

            service.AddTransient<IProdutoService, ProdutoService>();
            service.AddTransient<IProdutoRepository, ProdutoRepository>();

            service.AddTransient<IProdutosClienteService, ProdutosClienteService>();
            service.AddTransient<IProdutosClienteRepository, ProdutosClienteRepository>();

            service.AddDbContext<Projeto_LucasContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Projeto_LucasConnectionString"), 
                    b => b.MigrationsAssembly("Projeto_Lucas.Api")));
        }
    }
}
