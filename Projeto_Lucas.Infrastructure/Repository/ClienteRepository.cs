using Microsoft.EntityFrameworkCore;
using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Projeto_Lucas.Infrastructure.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private Projeto_LucasContext _context;
        public ClienteRepository(Projeto_LucasContext clienteContext) => _context = clienteContext;

        public Cliente ClientePorId(int id)
        {
            return _context.Clientes.Find(id);
        }

        public string DeletarCliente(int id)
        {
            Cliente cliente = _context.Clientes.Find(id);
            _context.Clientes.Remove(cliente);
            Salvar();
            return cliente.Nome;
        }

        public string EditarCliente(Cliente cliente)
        {
            _context.Entry(cliente).State = EntityState.Modified;
            Salvar();
            return cliente.Nome;
        }

        public string InserirCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            Salvar();
            return cliente.Nome;
        }

        public IEnumerable<Cliente> TodosClientes()
        {
            return _context.Clientes.ToList().OrderBy(x => x.Nome);
        }

        public void Salvar()
        {
            _context.SaveChanges();
        }
    }
}
