using Api.Domain.Interfaces.Application;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Api.Controllers
{
    [Route("api")]
    public class VideoController : Controller
    {
        private readonly IVideoService _service;

        public VideoController(IVideoService service)
        {
            _service = service;
        }

        [HttpDelete("/recycler/process/{days}")]
        public async Task<ActionResult> DeleteVideos([FromRoute] int days)
        {
            try
            {
                var status = _service.DeleteVideos(days);
                return Json(new { status = status.Result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
