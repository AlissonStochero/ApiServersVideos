using Api.Domain.Entities;
using Api.Domain.Interfaces.Application;
using Api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Api.Application.Services
{
    public class VideoService : IVideoService
    {
        private IRepositoryBase<Video> _repository { get; set; }
        public VideoService(IRepositoryBase<Video> repository)
        {
            _repository = repository;
        }

        public void Save(Guid serverId, IFormFile video)
        {
            if (video == null)
            {
                throw new ArgumentNullException(nameof(video));
            }
            else if (serverId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(serverId));
            }

            var videoObj = new Video(
                    video.FileName,
                    Convert.ToInt32(video.Length),
                    ConvertFileToBase64(video),
                    serverId);

            _repository.Save(videoObj);
            _repository.SaveChanges();
        }
        public void Delete(Guid videoId, Guid serverId)
        {
            if (videoId == Guid.Empty)
                throw new ArgumentNullException(nameof(videoId));

            var video = _repository.Find(video => video.Id == videoId && video.ServerId == serverId);

            try
            {
                _repository.Delete(video);
                _repository.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
        public Video Get(Guid videoId, Guid serverId)
        {
            if (videoId == Guid.Empty)
                throw new ArgumentNullException(nameof(videoId));

            try
            {
                var video = _repository.Find(video => video.Id == videoId && video.ServerId == serverId);
                return video;
            }
            catch
            {
                throw;
            }
        }
        public string GetBinary(Guid videoId, Guid serverId)
        {
            if (videoId == Guid.Empty)
                throw new ArgumentNullException(nameof(videoId));

            try
            {
                var video = _repository.Find(video => video.Id == videoId && video.ServerId == serverId);
                return video.VideoInBytes;
            }
            catch
            {
                throw;
            }
        }
        public List<Video> GetAll()
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
        public async Task<string> DeleteVideos(int days)
        {
            try
            {
                var videos = _repository.Query(video => video.InsertAt < DateTime.Now.AddDays(-days));
                var task = Task.Run(async () => {
                    _repository.DeleteRange(videos);
                    _repository.SaveChanges();
                });
                return task.IsCompleted ? "not running" : "running";
            }
            catch
            {
                throw;
            }
        }
        public string ConvertFileToBase64(IFormFile video)
        {
            using (var ms = new MemoryStream())
            {
                video.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string bytesVideo = Convert.ToBase64String(fileBytes);

                return bytesVideo;
            }
        }
    }
}
