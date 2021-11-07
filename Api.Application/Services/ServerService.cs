using Api.Domain.Entities;
using Api.Domain.Interfaces.Application;
using Api.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;

namespace Api.Application.Services
{
    public class ServerService : IServerService
    {
        private IRepositoryBase<Server> _repository { get; set; }
        public ServerService(IRepositoryBase<Server> repository)
        {
            _repository = repository;
        }

        public void Save(Server server) {

            if(server == null)
            {
                throw new ArgumentNullException(nameof(server));
            }else if (String.IsNullOrEmpty(server.Ip))
            {
                throw new ArgumentNullException(nameof(server.Ip));
            }
            else if (String.IsNullOrEmpty(server.Port))
            {
                throw new ArgumentNullException(nameof(server.Port));
            }

            _repository.Save(server);
            _repository.SaveChanges();
        }
        public void Delete(Guid serverId)
        {
            if(serverId == Guid.Empty)
                throw new ArgumentNullException(nameof(serverId));

            Server server = _repository.FindById(serverId);

            try {
                _repository.Delete(server);
                _repository.SaveChanges();
            }
            catch {
                throw;
            }
        }
        public Server Get(Guid serverId)
        {
            if (serverId == Guid.Empty)
                throw new ArgumentNullException(nameof(serverId));

            try
            {
                return _repository.FindById(serverId);
            }
            catch
            {
                throw;
            }
        }
        public List<Server> GetAll()
        {
            try
            {
                return _repository.GetAll();
            }
            catch
            {
                throw;
            }
        }
    }
}
