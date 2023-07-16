const baseUrl = 'http://localhost:8082/turnos';
const baseUrlPacientes = 'http://localhost:8082/pacientes';
const baseUrlOdontologos = 'http://localhost:8082/odontologos';

document.addEventListener('DOMContentLoaded', () => {
    listarTodos();
});

btnAgregarTurno.addEventListener('click', () => {
    sectionFormModificarTurno.style.display = 'none';
    sectionFormAgregarTurno.style.display = 'block';
    renderizarPacientesASelectForm(selectPacientes);
    renderizarOdontologosASelectForm(selectOdontolgos);
});

btnRefreshTablaTurno.addEventListener('click', () => {
    listarTodos();
});

btnFormAgregarTurno.addEventListener('click', (e) => {
    e.preventDefault();

    divErrorAgregarTurno.innerHTML = '';
    divErrorAgregarTurno.style.display = 'block';

    const settings = {
        paciente: '',
        odontologo: '',
        fecha: '',
    };

    // Paciente

    if (validarInputMayorACero(inputPaciente.value)) {
        settings.paciente = normalizarTexto(inputPaciente.value);
    } else {
        if (!validarInputMayorACero(inputPaciente.value)) {
            divErrorAgregarTurno.innerHTML += `
                <p class="error">⚠️ El Paciente no puede quedar vacio</p>
            `;
        }
    }

    // Odontologo

    if (validarInputMayorACero(inputOdontologo.value)) {
        settings.odontologo = normalizarTexto(inputOdontologo.value);
    } else {
        if (!validarInputMayorACero(inputOdontologo.value)) {
            divErrorAgregarTurno.innerHTML += `
                <p class="error">⚠️ El Odontologo no puede quedar vacio</p>
            `;
        }
    }

    // Fecha y Hora
    if (
        validarInputMayorACero(inputFechaYHora.value) &&
        validarFechaYHora(inputFechaYHora.value)
    ) {
        settings.fecha = normalizarTexto(inputFechaYHora.value);
    } else {
        if (!validarInputMayorACero(inputFechaYHora.value)) {
            divErrorAgregarTurno.innerHTML += `
                <p class="error">⚠️ La fecha de ingreso no puede quedar vacia</p>
            `;
        } else if (!validarFechaYHora(inputFechaYHora.value)) {
            divErrorAgregarTurno.innerHTML += `
                <p class="error">⚠️ La fecha no puede ser anterior a la actual</p>
            `;
        }
    }

    if (
        settings.paciente.length > 0 &&
        settings.odontologo.length > 0 &&
        settings.fecha.length > 0
    ) {
        divErrorAgregarTurno.style.display = 'none';
        agregarTurno();
        formAgregarTurno.reset();
    }
});

btnSearchTurno.addEventListener('click', (e) => {
    e.preventDefault();
    listarTurnoByCriterio(inputSearchTurnos.value);
});

function renderizarTurnosATabla(turnos, selectorTabla) {
    selectorTabla.innerHTML = '';

    turnos.forEach((turno) => {
        const fechaYHoraFormateada = turno.fechaYHora.replace('T', ' ');

        const fila = selectorTabla.insertRow();
        const celdaId = fila.insertCell();
        const celdaPaciente = fila.insertCell();
        const celdaOdontologo = fila.insertCell();
        const celdaFechaYHora = fila.insertCell();
        const botones = fila.insertCell();

        celdaId.innerHTML = `<button id='${turno.id}' class='btn-table btn-id'>${turno.id}</button>`;
        celdaPaciente.innerHTML = `${turno.paciente}`;
        celdaOdontologo.innerHTML = `${turno.odontologo}`;
        celdaFechaYHora.innerHTML = fechaYHoraFormateada;
        // celdaFechaYHora.innerHTML = `${turno.fechaYHora}`;
        botones.innerHTML = `<button id='${turno.id}' class="btn-table btn-modificar" onclick='cargarFormModificarTurno(this.id)'>
                                <a href='#modificar-turno'>Modificar</a>
                            </button>
                            <button id='${turno.id}' class="btn-table btn-eliminar" onclick='eliminarTurnoById(this.id)'>
                                Eliminar
                            </button>
                            `;
    });
}

function renderizarTurnoATabla(turno, selectorTabla) {
    const fechaYHoraFormateada = turno.fechaYHora.replace('T', ' ');

    const fila = selectorTabla.insertRow();
    const celdaId = fila.insertCell();
    const celdaPaciente = fila.insertCell();
    const celdaOdontologo = fila.insertCell();
    const celdaFechaYHora = fila.insertCell();
    const botones = fila.insertCell();

    celdaId.innerHTML = `<button id='${turno.id}' class='btn-table btn-id'>${turno.id}</button>`;
    celdaPaciente.innerHTML = `${turno.paciente}`;
    celdaOdontologo.innerHTML = `${turno.odontologo}`;
    // celdaFechaYHora.innerHTML = `${turno.fecha}`;
    celdaFechaYHora.innerHTML = fechaYHoraFormateada;
    botones.innerHTML = `<button id='${turno.id}' class="btn-table btn-modificar" onclick='cargarFormModificarTurno(this.id)'>
                                <a href='#modificar-turno'>Modificar</a>
                            </button>
                            <button id='${turno.id}' class="btn-table btn-eliminar" onclick='eliminarTurnoById(this.id)'>
                                Eliminar
                            </button>
                            `;
}

async function renderizarPacientesASelectForm(selector) {
    selector.innerHTML = '';
    selector.innerHTML = `
        <option value='' disabled selected>
            -- Seleccionar Paciente --
        </option>
    `;
    const res = await fetch(baseUrlPacientes);

    const pacientes = await res.json();

    pacientes.forEach((paciente) => {
        const optionElement = document.createElement('option');
        optionElement.value = paciente.id;
        optionElement.textContent = paciente.nombre + ' ' + paciente.apellido;
        selector.appendChild(optionElement);
    });
}

async function renderizarOdontologosASelectForm(selector) {
    selector.innerHTML = '';
    selector.innerHTML = `
        <option value='' disabled selected>
            -- Seleccionar Odontologo --
        </option>
    `;
    const res = await fetch(baseUrlOdontologos);

    const odontologos = await res.json();

    odontologos.forEach((odontologo) => {
        const optionElement = document.createElement('option');
        optionElement.value = odontologo.id;
        optionElement.textContent =
            odontologo.nombre + ' ' + odontologo.apellido;
        selector.appendChild(optionElement);
    });
}

// GET Turno
const listarTurnoById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);

    const turno = await res.json();

    return turno;
};

// GET Todos los Turnos
async function listarTodos() {
    const res = await fetch(baseUrl);

    const turnos = await res.json();

    renderizarTurnosATabla(turnos, tbodyTablaTurnos);
    validarSiExisteRegistros(turnos, turnosTabla, pSinRegistros);
}

// GET Turnos by criterio
async function listarTurnoByCriterio(criterio) {
    const res = await fetch(
        `${baseUrl}/turno?criterio=` +
            encodeURIComponent(criterio.toLowerCase())
    );

    const turnos = await res.json();

    if (turnos.length > 0) {
        renderizarTurnosATabla(turnos, tbodyTablaTurnos);
    } else if (turnos.length == 1) {
        renderizarTurnoATabla(turnos, tbodyTablaTurnos);
    } else {
        console.log('No se encontraron resultados');
        listarTodos();
    }
}

// DELETE Turno by ID
async function eliminarTurnoById(id) {
    let confirmacion = window.confirm(
        '¿Estás seguro de que deseas eliminar este usuario?'
    );

    if (confirmacion) {
        await fetch(`${baseUrl}/eliminar/${id}`, {
            method: 'DELETE',
        });

        listarTodos();
    }
}

// POST Turno
async function agregarTurno() {
    const inputFechaYHoraFormateada = inputFechaYHora.value.replace('T', ' ');

    const payload = {
        paciente: {
            id: inputPaciente.value,
        },
        odontologo: {
            id: inputOdontologo.value,
        },
        fechaYHora: inputFechaYHoraFormateada,
    };

    const res = await fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const turno = await res.json();

    renderizarTurnoATabla(turno, tbodyTablaTurnos);
    listarTodos();
    formularioEnviadoCorrectamente(
        formAgregarTurno,
        sectionFormAgregarTurno,
        divMensajeExitosoAgregarTurno,
        '✅ Turno agregado con exito'
    );
}

function convertirFecha(fecha) {
    let partes = fecha.split(' ');

    let fechaPartes = partes[0].split('-');
    let dia = fechaPartes[0];
    let mes = fechaPartes[1];
    let año = fechaPartes[2];

    let horaPartes = partes[1].split(':');
    let hora = horaPartes[0];
    let minuto = horaPartes[1];

    let fechaConvertida =
        año + '-' + mes + '-' + dia + 'T' + hora + ':' + minuto;

    return fechaConvertida;
}

function definirSelectPorTexto(textoDeseado, selectorSelect) {
    for (let i = 0; i < selectorSelect.options.length; i++) {
        let option = selectorSelect.options[i];

        if (option.text === textoDeseado) {
            option.selected = true;
            break;
        }
    }
}

async function cargarFormModificarTurno(id) {
    sectionFormAgregarTurno.style.display = 'none';
    sectionFormModificarTurno.style.display = 'block';

    renderizarPacientesASelectForm(selectPacientesModificar);
    renderizarOdontologosASelectForm(selectOdontolgosModificar);

    const turno = await listarTurnoById(id);
    inputTurnoId.value = turno.id;

    definirSelectPorTexto(turno.paciente, inputPacienteModificar);
    definirSelectPorTexto(turno.odontologo, inputOdontologoModificar);

    const inputFechaYHoraFormateada = convertirFecha(turno.fechaYHora);
    inputFechaYHoraModificar.value = inputFechaYHoraFormateada;
}

// PUT Modificar Turno
async function modificarTurno() {
    const inputFechaYHoraFormateada = inputFechaYHoraModificar.value.replace(
        'T',
        ' '
    );

    const payload = {
        id: inputTurnoId.value,
        paciente: {
            id: inputPacienteModificar.value,
        },
        odontologo: {
            id: inputOdontologoModificar.value,
        },
        fechaYHora: inputFechaYHoraFormateada,
    };

    const res = await fetch(`${baseUrl}/actualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    await res.json();

    listarTodos();
    formularioEnviadoCorrectamente(
        formModificarTurno,
        sectionFormModificarTurno,
        divMensajeExitosoModificarTurno,
        '✅ Turno modificado con exito'
    );
}

btnModificarTurno.addEventListener('click', (e) => {
    e.preventDefault();

    divErrorModificarTurno.innerHTML = '';
    divErrorModificarTurno.style.display = 'block';

    const settings = {
        paciente: '',
        odontologo: '',
        fecha: '',
    };

    // Paciente

    if (validarInputMayorACero(inputPacienteModificar.value)) {
        settings.paciente = normalizarTexto(inputPacienteModificar.value);
    } else {
        if (!validarInputMayorACero(inputPacienteModificar.value)) {
            divErrorModificarTurno.innerHTML += `
                <p class="error">⚠️ El Paciente no puede quedar vacio</p>
            `;
        }
    }

    // Odontologo

    if (validarInputMayorACero(inputOdontologoModificar.value)) {
        settings.odontologo = normalizarTexto(inputOdontologoModificar.value);
    } else {
        if (!validarInputMayorACero(inputOdontologoModificar.value)) {
            divErrorModificarTurno.innerHTML += `
                <p class="error">⚠️ El Odontologo no puede quedar vacio</p>
            `;
        }
    }

    // Fecha y Hora
    if (
        validarInputMayorACero(inputFechaYHoraModificar.value) &&
        validarFechaYHora(inputFechaYHoraModificar.value)
    ) {
        settings.fecha = normalizarTexto(inputFechaYHoraModificar.value);
    } else {
        if (!validarInputMayorACero(inputFechaYHoraModificar.value)) {
            divErrorModificarTurno.innerHTML += `
                <p class="error">⚠️ La fecha de ingreso no puede quedar vacia</p>
            `;
        } else if (!validarFechaYHora(inputFechaYHoraModificar.value)) {
            divErrorModificarTurno.innerHTML += `
                <p class="error">⚠️ La fecha no puede ser anterior a la actual</p>
            `;
        }
    }

    if (
        settings.paciente.length > 0 &&
        settings.odontologo.length > 0 &&
        settings.fecha.length > 0
    ) {
        divErrorModificarTurno.style.display = 'none';
        modificarTurno();
        formModificarTurno.reset();
    }
});
