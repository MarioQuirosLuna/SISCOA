﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("TSISCOA_Usuario", Schema = "USUARIO")]
    public class TSISCOA_Usuario
    {
        [Key]
        public int ID { get; set; }
        public string TC_Identificacion { get; set; }
        public string TC_Nombre { get; set; }
        public string TC_PrimerApellido { get; set; }
        public string TC_SegundoApellido { get; set; }
        public string TV_Contrasenna { get; set; }
        public string TC_Correo { get; set; }
        [ForeignKey("TSISCOA_Oficina")]
        public int FK_SISCOA_Oficina_SISCOA_Usuario { get; set; }
        [ForeignKey("TSISCOA_Rol")]
        public int FK_SISCOA_Rol_SISCOA_Usuario { get; set; }
        public virtual TSISCOA_Oficina TSISCOA_Oficina { get; set; }
        public virtual TSISCOA_Rol TSISCOA_Rol { get; set; }
    }
}
