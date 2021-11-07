using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            modelBuilder.HasPostgresExtension("uuid-ossp");
        }
        public DbSet<Server> Servidor { get; set; }
        public DbSet<Video> Video { get; set; }

    }
}
