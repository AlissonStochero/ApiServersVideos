using Api.Domain.Entities;
using Api.Domain.Interfaces.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Api.Controllers
{
    [Route("api")]
    public class ServerController : Controller
    {
        private readonly IServerService _service;
        private readonly IVideoService _serviceVideo;

        public ServerController(IServerService service, IVideoService serviceVideo)
        {
            _service = service;
            _serviceVideo = serviceVideo;
        }

        [HttpPost("/server")]
        public async Task<ActionResult> Salvar(Server server)
        {
            try
            {
                return await Task.Run(() =>
                {
                    _service.Save(server);
                    return Json(new{ status = true });
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpDelete("/servers/{serverId}")]
        public async Task<ActionResult> Delete([FromRoute] Guid serverId)
        {
            try
            {
                return await Task.Run(() =>
                {
                    _service.Delete(serverId);
                    return Json(new { status = true });
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("/servers/{serverId}")]
        public async Task<ActionResult> Get([FromRoute] Guid serverId)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var obj = _service.Get(serverId);
                    return Json(obj);
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("/servers")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                return await Task.Run(() =>
                {
                    var obj = _service.GetAll();
                    return Json(obj);
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpPost("/servers/{serverId}/videos")]
        public async Task<ActionResult> UploadVideo([FromRoute] Guid serverId, IFormFile video)
        {
            try
            {
                return await Task.Run(() =>
                {
                    _serviceVideo.Save(serverId, video);
                    return Json(new { status = true });
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpDelete("/servers/{serverId}/videos/{videoId}")]
        public async Task<ActionResult> DeleteVideo([FromRoute] Guid serverId, [FromRoute] Guid videoId)
        {
            try
            {
                return await Task.Run(() =>
                {
                    _serviceVideo.Delete(videoId, serverId);
                    return Json(new { status = true });
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("/servers/{serverId}/videos/{videoId}")]
        public async Task<ActionResult> GetVideo([FromRoute] Guid serverId, [FromRoute] Guid videoId)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var obj = _serviceVideo.Get(videoId, serverId);
                    return Json(obj);
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("/servers/{serverId}/videos/{videoId}/binary")]
        public async Task<ActionResult> GetBinaryVideo([FromRoute] Guid serverId, [FromRoute] Guid videoId)
        {
            try
            {
                return await Task.Run(() =>
                {
                    var obj = _serviceVideo.GetBinary(videoId, serverId);
                    return Json(new { videoBytes = obj });
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpGet("/servers/{serverId}/videos")]
        public async Task<ActionResult> GetAllVideos()
        {
            try
            {
                return await Task.Run(() =>
                {
                    var obj = _serviceVideo.GetAll();
                    return Json(obj);
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
