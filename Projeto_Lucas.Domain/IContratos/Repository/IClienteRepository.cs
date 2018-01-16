using Projeto_Lucas.Domain.Entities;
using System.Collections.Generic;

namespace Projeto_Lucas.Domain.IContratos.Repository
{
    public interface IClienteRepository
    {
        IEnumerable<Cliente> TodosClientes();
        Cliente ClientePorId(int id);
        string InserirCliente(Cliente cliente);
        string DeletarCliente(int id);
        string EditarCliente(Cliente cliente);
    }
}
