const $ = (id) => document.querySelector(id);
const $id = (id) => document.getElementById(id);

// Selectores Turno

const turnosTabla = $id('turnos-tabla');
const tbodyTablaTurnos = $('.tbody');
const btnRefreshTablaTurno = $('.btn-refresh--turnos');
const btnAgregarTurno = $('.btn-agregar--turno');
// const btnModificarTurno = $('.btn-modificar--turno');
const btnModificarTurno = $('.btn-form--modificarTurno');
const pSinRegistros = $('.sin-registros');

const btnSearchTurno = $id('btn-search--turnos');
const inputSearchTurnos = $('.input-search--turnos');

// Form Modificar
const sectionFormModificarTurno = $('.form-modificar--turno');
const formModificarTurno = $('.form-turno--modificar');
const inputTurnoId = $id('id-form-modificar');

const inputPacienteModificar = $('.input-paciente--modificarTurno');
const inputOdontologoModificar = $('.input-odontologo--modificarTurno');
const inputFechaYHoraModificar = $('.input-fechaYHora--modificarTurno');

const divErrorModificarTurno = $id('response-modificar--turno');
const divMensajeExitosoModificarTurno = $id('form-modificar--exitoso');

// Agregar datos a los select
const selectPacientesModificar = $id('pacienteModificar');
const selectOdontolgosModificar = $id('odontologoModificar');

// Form Agregar
const sectionFormAgregarTurno = $('.form-agregar--turno');
const formAgregarTurno = $('.form-turno--agregar');
const btnFormAgregarTurno = $('.btn-form--agregarTurno');

const divErrorAgregarTurno = $id('response-agregar--turno');
const divMensajeExitosoAgregarTurno = $id('form-agregar--exitoso');

// Input Formulario Agregar
const inputPaciente = $('.input-paciente--agregarTurno');
const inputOdontologo = $('.input-odontologo--agregarTurno');
const inputFechaYHora = $('.input-fechaYHora--agregarTurno');
const selectPacientes = $id('pacienteAgregar');
const selectOdontolgos = $id('odontologoAgregar');
