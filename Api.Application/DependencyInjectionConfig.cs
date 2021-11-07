using Api.Application.Services;
using Api.Domain.Interfaces.Application;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Application
{
    public class DependencyInjectionConfig
    {
        public static void Inject(IServiceCollection services)
        {
            services.AddTransient<IServerService, ServerService>();
            services.AddTransient<IVideoService, VideoService>();
        }
    }
}
