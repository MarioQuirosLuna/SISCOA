﻿using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public interface IUsuarioRepository : IGenericRepository<TSISCOA_Usuario>
    {
        Task<TSISCOA_Usuario> LogIn(TSISCOA_Usuario usuario);
    }
}
