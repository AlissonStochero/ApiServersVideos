using Api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Domain.Interfaces.Application
{
    public interface IServerService
    {
        void Save(Server servidor);
        void Delete(Guid serverId);
        Server Get(Guid serverId);
        List<Server> GetAll();
    }
}
