function validarInputMayorACero(input) {
    if (input.length > 0) {
        return input;
    }
}

function validarInputMayorACinco(input) {
    if (input.length >= 5) {
        return input;
    }
}

function validarInputMayorADiez(input) {
    if (input.length > 10) {
        return input;
    }
}

function validarInputMayorACincuenta(input) {
    if (input.length > 50) {
        return input;
    }
}

function validarInputSoloLetras(input) {
    const soloLetras = /^[a-zA-Z]+$/;

    if (soloLetras.test(input)) {
        return input;
    }
}

function validarNumeros(input) {
    var patron = /^[0-9]+$/;
    if (patron.test(input)) {
        return input;
    }
}

function validarFecha(fecha) {
    let fechaSeleccionada = new Date(fecha);

    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);

    let fechaActual = new Date();

    if (fechaActual.getDay() <= fechaSeleccionada.getDay()) {
        return fechaSeleccionada;
    }
}

function validarFechaYHora(fechaHora) {
    const fechaYHoraFormateada = fechaHora.replace('T', ' ');

    let fechaSeleccionada = new Date(fechaYHoraFormateada);

    let fechaActual = new Date();

    // console.log('Fecha Seleccionada: ' + fechaSeleccionada);

    // console.log('Fecha Actual: ' + fechaActual);
    if (fechaActual <= fechaSeleccionada) {
        return fechaSeleccionada;
    }
}

function normalizarTexto(texto) {
    return texto.trim();
}

function formularioEnviadoCorrectamente(
    formulario,
    section,
    mensajeSelector,
    mensajeAMostrar
) {
    mensajeSelector.innerHTML = '';
    mensajeSelector.innerHTML = mensajeAMostrar;
    mensajeSelector.style.display = 'block';

    setTimeout(function () {
        mensajeSelector.style.display = 'none';
        section.style.display = 'none';
    }, 1000);

    formulario.reset();
}
