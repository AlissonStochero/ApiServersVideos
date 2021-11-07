using Api.Domain.Interfaces.Repositories;
using Api.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Persistence
{
    public class DependencyInjectionConfig
    {
        public static void Inject(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
        }
    }
}
