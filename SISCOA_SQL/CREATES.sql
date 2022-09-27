--CREATE DATABASE SISCOA

--USE SISCOA
--CREATE SCHEMA CONTROL
--CREATE SCHEMA OFICINA
--CREATE SCHEMA USUARIO

USE SISCOA

/**
DROP TABLE [USUARIO].[TSISCOA_Usuario]
DROP TABLE [USUARIO].[TSISCOA_RolPermiso]
DROP TABLE [USUARIO].[TSISCOA_Rol]
DROP TABLE [USUARIO].[TSISCOA_Permiso]
DROP TABLE [OFICINA].[TSISCOA_OficinaControl]
DROP TABLE [OFICINA].[TSISCOA_Oficina]
DROP TABLE [CONTROL].[TSISCOA_Control]
DROP TABLE [CONTROL].[TSISCOA_Periodo]
DROP TABLE [CONTROL].[TSISCOA_Estado]
**/


CREATE TABLE CONTROL.TSISCOA_Estado
(
	PK_SISCOA_Estado INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME
)
 
CREATE TABLE CONTROL.TSISCOA_Periodo
(
	PK_SISCOA_Periodo INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME
)

CREATE TABLE CONTROL.TSISCOA_Control
(
	PK_SISCOA_Control INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TC_DescriptionDocumentacionEvidencia VARCHAR(255) NOT NULL,
	FK_TN_Estado INT NULL,
	FK_TN_Periodo INT NULL,
	TB_NotificacionCorreoAColaborador BIT NOT NULL DEFAULT 0,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME,
	FOREIGN KEY (FK_TN_Estado) REFERENCES [CONTROL].[TSISCOA_Estado](PK_SISCOA_Estado),
	FOREIGN KEY (FK_TN_Periodo) REFERENCES [CONTROL].[TSISCOA_Periodo](PK_SISCOA_Periodo)
)

CREATE TABLE OFICINA.TSISCOA_Oficina
(
	PK_SISCOA_Oficina INT PRIMARY KEY IDENTITY(1,1),
	TC_CodigoOficina VARCHAR(25) NULL,
	TC_Nombre VARCHAR(50) NOT NULL,
	TC_Institucion VARCHAR(50) NULL,
	TB_EstadoActividad BIT NOT NULL DEFAULT 0,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME
)

CREATE TABLE OFICINA.TSISCOA_OficinaControl
(
	PK_TSISCOA_OficinaControl INT PRIMARY KEY IDENTITY(1,1),
	FK_SISCOA_CONTROL_SISCOA_OficinaControl INT NOT NULL,
	FK_SISCOA_OFICINA_SISCOA_OficinaControl INT NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME,
	FOREIGN KEY (FK_SISCOA_CONTROL_SISCOA_OficinaControl) REFERENCES [CONTROL].[TSISCOA_Control]([PK_SISCOA_Control]),
	FOREIGN KEY (FK_SISCOA_OFICINA_SISCOA_OficinaControl) REFERENCES [OFICINA].[TSISCOA_Oficina]([PK_SISCOA_Oficina])
)

CREATE TABLE USUARIO.TSISCOA_Permiso
(
	PK_SISCOA_Permiso INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME
)

CREATE TABLE USUARIO.TSISCOA_Rol
(
	PK_SISCOA_Rol INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME
)

CREATE TABLE USUARIO.TSISCOA_RolPermiso
(
	PK_SISCOA_RolPermiso INT PRIMARY KEY IDENTITY(1,1),
	FK_SISCOA_Rol_SISCOA_RolPermiso INT NOT NULL,
	FK_SISCOA_Permiso_SISCOA_RolPermiso INT NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME,
	FOREIGN KEY (FK_SISCOA_Rol_SISCOA_RolPermiso) REFERENCES [USUARIO].[TSISCOA_Rol]([PK_SISCOA_Rol]),
	FOREIGN KEY (FK_SISCOA_Permiso_SISCOA_RolPermiso) REFERENCES [USUARIO].[TSISCOA_Permiso]([PK_SISCOA_Permiso])
)

CREATE TABLE USUARIO.TSISCOA_Usuario
(
	PK_SISCOA_Usuario INT PRIMARY KEY IDENTITY(1,1),
	TC_Nombre VARCHAR(50) NOT NULL,
	TC_PrimerApellido VARCHAR(50) NOT NULL,
	TC_SegundoApellido VARCHAR(50) NOT NULL,
	TV_Contrasenna VARBINARY(255) NOT NULL,
	TC_Correo VARCHAR(50) NOT NULL,
	FK_SISCOA_Oficina_SISCOA_Usuario INT NOT NULL,
	FK_SISCOA_Rol_SISCOA_Usuario INT NOT NULL,
	TB_EstaActivo BIT DEFAULT 1,
	TB_EstaBorrado BIT DEFAULT 0,
	TC_UltimaModificacion VARCHAR(50),
	TF_UltimaFechaModificacion DATETIME,
	FOREIGN KEY (FK_SISCOA_Oficina_SISCOA_Usuario) REFERENCES [OFICINA].[TSISCOA_Oficina]([PK_SISCOA_Oficina]),
	FOREIGN KEY (FK_SISCOA_Rol_SISCOA_Usuario) REFERENCES [USUARIO].[TSISCOA_Rol]([PK_SISCOA_Rol])
)


