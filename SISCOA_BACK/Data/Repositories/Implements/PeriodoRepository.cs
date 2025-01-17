﻿using Data.Data;
using Entities.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Repositories.Repositories.Implements
{
    public class PeriodoRepository : GenericRepository<TSISCOA_Periodo>, IPeriodoRepository
    {
        private readonly SISCOA_Context siscoa_context;
        public PeriodoRepository(SISCOA_Context siscoa_context) : base(siscoa_context)
        {
            this.siscoa_context = siscoa_context;
        }
        public async Task<bool> DeletedCheckOnEntity(int id)
        {
            var flag = await siscoa_context.OficinaControles.AnyAsync(x => x.FK_TN_PERIODO_SISCOA_OficinaControl == id);
            return flag;
        }
    }
}
