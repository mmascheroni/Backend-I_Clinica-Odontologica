const $ = (id) => document.querySelector(id);
const $id = (id) => document.getElementById(id);

// Selectores - Odontologos
const odontologosTabla = $id('odontologos-tabla');
const btnRefreshTablaOdontologo = $('.btn-refresh--odontologos');
const pSinRegistros = $('.sin-registros');

const btnSearchOdontologos = $id('btn-search--odontologos');
const inputSearchOdontologos = $('.input-search--odontologos');

const sectionFormModificarOdontologo = $('.form-modificar--odontologo');
const sectionFormAgregarOdontologo = $('.form-agregar--odontologo');

const btnAgregarOdontologo = $('.btn-agregar--odontologo');

const btnFormModificarOdontologo = $('.btn-form--modificarOdontologo');
const btnFormAgregarOdontologo = $('.btn-form--agregarOdontologo');

const formularioModificarOdontologo = $('.modificar-form--odontologo');
const formularioAgregarOdontologo = $('.agregar-form--odontologo');

const inputId = $('.inputId');
const inputNombreOdontologoModificar = $('.input-nombre--modificarOdontologo');
const inputApellidoOdontologoModificar = $(
    '.input-apellido--modificarOdontologo'
);
const inputMatriculaOdontologoModificar = $(
    '.input-matricula--modificarOdontologo'
);

let divErrorModificarOdontologo = $id('response-modificar--odontologo');
let divMensajeExitosoModificarOdontologo = $id('form-modificar--exitoso');

// Input Formulario Agregar
const inputNombreOdontologo = $('.input-nombre--agregarOdontologo');
const inputApellidoOdontologo = $('.input-apellido--agregarOdontologo');
const inputMatriculaOdontologo = $('.input-matricula--agregarOdontologo');

let divErrorAgregarOdontologo = $id('response-agregar--odontologo');

let divMensajeExitosoAgregarOdontologo = $id('form-agregar--exitoso');
