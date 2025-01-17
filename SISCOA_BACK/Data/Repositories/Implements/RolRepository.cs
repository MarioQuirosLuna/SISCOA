﻿using Data.Data;
using Entities.Models;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories.Repositories.Implements
{
    public class RolRepository : GenericRepository<TSISCOA_Rol>, IRolRepository
    {
        private readonly SISCOA_Context siscoa_context;
        public RolRepository(SISCOA_Context siscoa_context) : base(siscoa_context)
        {
            this.siscoa_context = siscoa_context;
        }
        public async Task<bool> DeletedCheckOnEntity(int id)
        {
            var flag = await siscoa_context.RolPermisos.AnyAsync(x => x.FK_SISCOA_Rol_SISCOA_RolPermiso == id);
            flag = await siscoa_context.Usuarios.AnyAsync(x => x.FK_SISCOA_Rol_SISCOA_Usuario == id);
            return flag;
        }
        public async Task<bool> VerifyPrivilegesRolUser(int rol, string permission)
        {
            //Busca los permisos del rol
            var rolPermissionList = await siscoa_context.RolPermisos.Where(x => x.FK_SISCOA_Rol_SISCOA_RolPermiso == rol).ToListAsync();
            foreach (var item in rolPermissionList)
            {
                //Verifica si el permiso del rol es igual al permiso que tiene el usuario logueado
                if (item.TSISCOA_Permiso.TC_Nombre == permission)
                {
                    return true;
                }
            }
            return false;
        }       
    }
}
