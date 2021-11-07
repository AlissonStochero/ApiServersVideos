using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Api.Domain.Interfaces.Repositories;

namespace Api.Persistence.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        public DbContext _dbContextEntity { get; set; }
        public DbSet<TEntity> _dbSetEntity { get; set; }

        public RepositoryBase(AppDbContext dbContext)
        {
            dbContext.ChangeTracker.AutoDetectChangesEnabled = false;
            _dbContextEntity = dbContext;
            _dbSetEntity = dbContext.Set<TEntity>();
        }

        public TEntity FindById(Guid id)
        {
            return _dbSetEntity.Find(id);
        }
        public List<TEntity> GetAll()
        {
            return _dbSetEntity.AsNoTracking().ToList();
        }

        public TEntity Find(Expression<Func<TEntity, bool>> where)
        {
            return Query(where).FirstOrDefault();
        }

        public IList<TEntity> Query(Expression<Func<TEntity, bool>> where)
        {
            return _dbSetEntity.Where(where).AsNoTracking().ToList();
        }

        public IQueryable<TEntity> List()
        {
            return _dbSetEntity.AsNoTracking();
        }

        public void SaveRange(IList<TEntity> obj)
        {
            foreach (var reg in obj)
            {
                Save(reg);
            }
        }

        public void Insert(TEntity obj)
        {
            _dbSetEntity.Add(obj);
        }

        public void Add(TEntity obj)
        {
            _dbSetEntity.Add(obj);
        }

        public void Update(TEntity obj)
        {
            _dbSetEntity.Update(obj);
        }

        public void UpdateFields(TEntity obj, string[] fields)
        {
            _dbSetEntity.Attach(obj);
            foreach (var field in fields)
            {
                _dbContextEntity.Entry(obj).Property(field).IsModified = true;
            }
        }

        public void UpdateSingleField(TEntity obj, string field)
        {
            _dbSetEntity.Attach(obj);
            _dbContextEntity.Entry(obj).Property(field).IsModified = true;
        }

        public void Save(TEntity obj)
        {
            if ((Guid)obj.GetType().GetProperty("Id").GetValue(obj, null) != Guid.Empty)
            {
                _dbSetEntity.Update(obj);
            }
            else
            {
                _dbSetEntity.Add(obj);
            }
        }

        public void Delete(TEntity obj)
        {
            if (obj != null)
            {
                _dbSetEntity.Remove(obj);
            }
        }

        public void Delete(int id)
        {
            var data = _dbSetEntity.Find(id);
            if (data != null)
            {
                _dbSetEntity.Remove(data);
            }
        }

        public void DeleteRange(IList<TEntity> obj)
        {
            _dbSetEntity.RemoveRange(obj);
        }

        public int SaveChanges()
        {
            var written = 0;
            while (written == 0)
            {
                try
                {
                    written = _dbContextEntity.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    foreach (var entry in ex.Entries)
                    {
                        throw new NotSupportedException("Erro de concorrência em " + entry.Metadata.Name);
                    }
                }
            }
            return written;
        }

        public void DetachAll()
        {
            foreach (var entry in _dbContextEntity.ChangeTracker.Entries().ToList())
            {
                _dbContextEntity.Entry(entry.Entity).State = EntityState.Detached;
            }
        }
    }
}
