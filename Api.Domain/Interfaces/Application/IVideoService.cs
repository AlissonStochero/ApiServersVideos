using Api.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Domain.Interfaces.Application
{
    public interface IVideoService
    {
        void Save(Guid serverId, IFormFile video);
        void Delete(Guid videoId, Guid serverId);
        Video Get(Guid videoId, Guid serverId);
        string GetBinary(Guid videoId, Guid serverId);
        List<Video> GetAll();
        Task<string> DeleteVideos(int days);
    }
}
