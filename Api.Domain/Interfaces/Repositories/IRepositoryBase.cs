using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Api.Domain.Interfaces.Repositories
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        TEntity FindById(Guid id);
        TEntity Find(Expression<Func<TEntity, bool>> where);
        List<TEntity> GetAll();
        IList<TEntity> Query(Expression<Func<TEntity, bool>> where);
        IQueryable<TEntity> List();
        void Save(TEntity obj);
        void SaveRange(IList<TEntity> obj);
        void Insert(TEntity obj);
        void Add(TEntity obj);
        void Update(TEntity obj);
        void UpdateFields(TEntity obj, string[] fields);
        void UpdateSingleField(TEntity obj, string field);
        void Delete(TEntity obj);
        void Delete(int id);
        void DeleteRange(IList<TEntity> obj);
        int SaveChanges();
        void DetachAll();
    }
}
