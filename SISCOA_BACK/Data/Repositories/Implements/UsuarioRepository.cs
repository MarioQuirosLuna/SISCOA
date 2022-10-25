﻿using Data.Data;
using Entities.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Repositories.Repositories.Implements
{
    public class UsuarioRepository : GenericRepository<TSISCOA_Usuario>, IUsuarioRepository
    {
        private readonly SISCOA_Context siscoa_context;
        public UsuarioRepository(SISCOA_Context siscoa_contex) : base(siscoa_contex)
        {
            this.siscoa_context = siscoa_contex;
        }
        public new async Task<IEnumerable<TSISCOA_Usuario>> GetAll()
        {
            var list = await siscoa_context.Usuarios.ToListAsync();
            foreach (var item in list)
            {
                item.TSISCOA_Oficina = await siscoa_context.Oficinas.FirstOrDefaultAsync(x => x.ID == item.FK_SISCOA_Oficina_SISCOA_Usuario);
                item.TSISCOA_Rol = await siscoa_context.Roles.FirstOrDefaultAsync(x => x.ID == item.FK_SISCOA_Rol_SISCOA_Usuario);
            }
            return list;
        }
        public new async Task<TSISCOA_Usuario> GetById(int id)
        {
            var list = await siscoa_context.Set<TSISCOA_Usuario>().FindAsync(id);

            if (list != null)
            {
                list.TSISCOA_Rol = await siscoa_context.Roles.FirstOrDefaultAsync(x => x.ID == list.FK_SISCOA_Rol_SISCOA_Usuario);
                list.TSISCOA_Oficina = await siscoa_context.Oficinas.FirstOrDefaultAsync(x => x.ID == list.FK_SISCOA_Oficina_SISCOA_Usuario);
            }
            return list;
        }
    }
}
