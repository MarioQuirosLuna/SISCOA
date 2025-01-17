﻿using AutoMapper;
using Business.DTOs;
using Entities.Models;
using Services.Services.Implements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SISCOA_API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class ActividadController : ApiController
    {
        private IMapper _mapper;
        private readonly ActividadService service = new ActividadService();
        private readonly ErrorService error = new ErrorService();
        /// <summary>
        /// Constructor
        /// </summary>
        public ActividadController()
        {
            this._mapper = WebApiApplication.MapperConfiguration.CreateMapper();
        }
        /// <summary>
        /// Obtiene todos los registros
        /// </summary>
        /// <param name="IDuserLogged">Id del usuario loggeado</param>
        /// <returns>Lista de todos los registros</returns>
        /// <response code="200">OK. Devuelve la lista de los registros</response>
        [HttpGet]
        [ResponseType(typeof(IEnumerable<TSISCOA_Actividad_DTO>))]
        public async Task<IHttpActionResult> GetAll(int IDuserLogged)
        {
            try
            {
                var entities = await service.GetAll();
                var DTO = entities.Select(x => _mapper.Map<TSISCOA_Actividad_DTO>(x));

                return Ok(DTO);
            }
            catch (Exception ex)
            {
                await error.Insert(new TSISCOA_Error
                {
                    TC_Description = ex.Message,
                    TC_UltimaAccion = "GetAll Actividades",
                    TF_FechaError = DateTime.Now,
                    FK_ID_UsuarioActivo = IDuserLogged
                });
                return InternalServerError(ex);
            }
        }
        /// <summary>
        /// Crea un registro
        /// </summary>
        /// <param name="DTO">El objeto JSON del registro</param>
        /// <returns>Registro insertado</returns>
        /// <response code="200">OK. Devuelve la lista de los registros</response>
        /// <response code="400">BadRequest. Consulta erronea</response>
        /// <response code="500">InternalServerError. Error con el servidor</response>
        [HttpPost]
        public async Task<IHttpActionResult> Post(TSISCOA_Actividad_DTO DTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var entities = _mapper.Map<TSISCOA_Actividad>(DTO);
                entities = await service.Insert(entities);
                return Ok(entities);
            }
            catch (Exception ex) { return InternalServerError(ex); }
        }
    }
}
