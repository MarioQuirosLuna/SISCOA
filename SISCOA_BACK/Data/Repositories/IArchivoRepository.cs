﻿using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public interface IArchivoRepository : IGenericRepository<TSISCOA_Archivo>
    {
        Task<IEnumerable<TSISCOA_Archivo>> GetAllWithIdOficinaControl(int id);
    }
}
