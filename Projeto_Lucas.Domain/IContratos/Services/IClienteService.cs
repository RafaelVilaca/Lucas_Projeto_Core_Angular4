using Projeto_Lucas.Domain.Entities;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.IContratos.Services
{
    public interface IClienteService
    {
        IEnumerable<Cliente> TodosClientes();
        Cliente ClientePorId(int id);
        string InserirCliente(Cliente cliente);
        string DeletarCliente(int id);
        string EditarCliente(Cliente cliente);
    }
}
