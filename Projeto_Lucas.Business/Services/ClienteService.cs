using Projeto_Lucas.Domain.Entities;
using Projeto_Lucas.Domain.IContratos.Repository;
using Projeto_Lucas.Domain.IContratos.Services;
using System.Collections.Generic;
using System.Net.Http;
using static System.Net.WebRequestMethods;

namespace Projeto_Lucas.Business.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public Cliente ClientePorId(int id)
        {
            var cliente = _clienteRepository.ClientePorId(id);
            if (cliente != null)
                return cliente;
            return null;
        }

        public string DeletarCliente(int id)
        {
            var response = _clienteRepository.DeletarCliente(id);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public string EditarCliente(Cliente cliente)
        {
            var response = _clienteRepository.EditarCliente(cliente);
            if (!string.IsNullOrEmpty(response))
                return response;
            return null;
        }

        public string InserirCliente(Cliente cliente)
        {
            return _clienteRepository.InserirCliente(cliente);
        }

        public IEnumerable<Cliente> TodosClientes()
        {
            return _clienteRepository.TodosClientes();
        }
    }
}
