const $ = (id) => document.querySelector(id);
const $id = (id) => document.getElementById(id);

// Selectores - Pacientes
const pacientesTabla = $id('pacientes-tabla');
const btnRefreshTablaPaciente = $('.btn-refresh--pacientes');
const sectionFormModificarPaciente = $('.form-modificar--paciente');
const sectionFormAgregarPaciente = $('.form-agregar--paciente');
const btnAgregarPaciente = $('.btn-agregar--paciente');
const pSinRegistros = $('.sin-registros');

const btnSearchPacientes = $id('btn-search--pacientes');
const inputSearchPacientes = $('.input-search--pacientes');

const tbodyTablaPacientes = $('.tbody');

const btnFormModificarPaciente = $('.btn-form--modificarPaciente');
const btnFormAgregarPaciente = $('.btn-form--agregarPaciente');

const formularioModificarPaciente = $('.modificar-form--paciente');
const formularioAgregarPaciente = $('.agregar-form--paciente');

// Input form modificar Paciente
const inputId = $('.inputId');
const inputModificarNombre = $('.input-nombre--modificarPaciente');
const inputModificarApellido = $('.input-apellido--modificarPaciente');
const inputModificarDni = $('.input-dni--modificarPaciente');
const inputModificarFechaIngreso = $('.input-fechaIngreso--modificarPaciente');
const inputModificarDomicilioId = $('.input-domicilioId--modificarPaciente');
const inputModificarCalle = $('.input-calle--modificarPaciente');
const inputModificarNumero = $('.input-numero--modificarPaciente');
const inputModificarLocalidad = $('.input-localidad--modificarPaciente');
const inputModificarProvincia = $('.input-provincia--modificarPaciente');

const divErrorModificarPaciente = $id('response-modificar--paciente');
const divMensajeExitosoModificarPaciente = $id('form-modificar--exitoso');

// Input form agregar Paciente
const inputAgregarNombre = $('.input-nombre--agregarPaciente');
const inputAgregarApellido = $('.input-apellido--agregarPaciente');
const inputAgregarDni = $('.input-dni--agregarPaciente');
const inputAgregarFechaIngreso = $('.input-fechaIngreso--agregarPaciente');
const inputAgregarDomicilioId = $('.input-domicilioId--agregarPaciente');
const inputAgregarCalle = $('.input-calle--agregarPaciente');
const inputAgregarNumero = $('.input-numero--agregarPaciente');
const inputAgregarLocalidad = $('.input-localidad--agregarPaciente');
const inputAgregarProvincia = $('.input-provincia--agregarPaciente');

const divErrorAgregarPaciente = $id('response-agregar--paciente');
const divMensajeExitosoAgregarPaciente = $id('form-agregar--exitoso');
