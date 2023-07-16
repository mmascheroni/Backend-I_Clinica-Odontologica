// Odontologos

function renderizarOdontologosATabla(odontologos, selectorTabla) {
    selectorTabla.innerHTML = '';

    odontologos.forEach((odontologo) => {
        const fila = selectorTabla.insertRow();
        const celdaId = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaMatricula = fila.insertCell();
        const botones = fila.insertCell();

        celdaId.innerHTML = `<button id='${odontologo.id}' class='btn-table btn-id'>${odontologo.id}</button>`;
        celdaNombre.innerHTML = `${odontologo.nombre}`;
        celdaApellido.innerHTML = `${odontologo.apellido}`;
        celdaMatricula.innerHTML = `${odontologo.matricula}`;
        botones.innerHTML = `<button id='${odontologo.id}' class="btn-table btn-modificar" onclick='cargarFormModificarOdontologo(this.id)'>
                            <a href='#modificar-odontologo'>Modificar</a>
                            </button>
                            <button id='${odontologo.id}' class="btn-table btn-eliminar" onclick='eliminarOdontologoById(this.id)'>
                                Eliminar
                            </button>
                            `;
    });
}

function renderizarOdontologoATabla(odontologo, selectorTabla) {
    const fila = selectorTabla.insertRow();
    const celdaId = fila.insertCell();
    const celdaNombre = fila.insertCell();
    const celdaApellido = fila.insertCell();
    const celdaMatricula = fila.insertCell();
    const botones = fila.insertCell();

    celdaId.innerHTML = `<button id='${odontologo.id}' class='btn-table btn-id'>${odontologo.id}</button>`;
    celdaNombre.innerHTML = `${odontologo.nombre}`;
    celdaApellido.innerHTML = `${odontologo.apellido}`;
    celdaMatricula.innerHTML = `${odontologo.matricula}`;
    botones.innerHTML = `<button id='${odontologo.id}' class="btn-table btn-modificar" onclick='cargarFormModificarOdontologo(this.id)'>
                            <a href='#modificar-odontologo'>Modificar</a>
                            </button>
                            <button id='${odontologo.id}' class="btn-table btn-eliminar" onclick='eliminarOdontologoById(this.id)'>
                                Eliminar
                            </button>
                            `;
}

// Pacientes
function renderizarPacientesATabla(pacientes, selectorTabla) {
    selectorTabla.innerHTML = '';

    pacientes.forEach((paciente) => {
        const fila = selectorTabla.insertRow();
        const celdaId = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaDni = fila.insertCell();
        const celdaFechaDeAlta = fila.insertCell();
        const celdaDomicilioId = fila.insertCell();
        const celdaCalle = fila.insertCell();
        const celdaNumero = fila.insertCell();
        const celdaLocalidad = fila.insertCell();
        const botones = fila.insertCell();

        celdaId.innerHTML = `<button id='${paciente.id}' class='btn-table btn-id'>${paciente.id}</button>`;
        celdaNombre.innerHTML = `${paciente.nombre}`;
        celdaApellido.innerHTML = `${paciente.apellido}`;
        celdaDni.innerHTML = `${paciente.dni}`;
        celdaFechaDeAlta.innerHTML = `${paciente.fechaIngreso}`;
        celdaDomicilioId.innerHTML = `${paciente.domicilio.id}`;
        celdaCalle.innerHTML = `${paciente.domicilio.calle}`;
        celdaNumero.innerHTML = `${paciente.domicilio.numero}`;
        celdaLocalidad.innerHTML = `${paciente.domicilio.localidad}`;
        botones.innerHTML = `<button id='${paciente.id}' class="btn-table btn-modificar" onclick='cargarFormModificarPaciente(this.id)'>
                            <a href='#modificar-paciente'>Modificar</a>
                            </button>
                            <button id='${paciente.id}' class="btn-table btn-eliminar" onclick='eliminarPacienteById(this.id)'>
                                Eliminar
                            </button>
                            `;
    });
}

function renderizarPacienteATabla(paciente, selectorTabla) {
    const fila = selectorTabla.insertRow();
    const celdaId = fila.insertCell();
    const celdaNombre = fila.insertCell();
    const celdaApellido = fila.insertCell();
    const celdaDni = fila.insertCell();
    const celdaFechaDeAlta = fila.insertCell();
    const celdaDomicilioId = fila.insertCell();
    const celdaCalle = fila.insertCell();
    const celdaNumero = fila.insertCell();
    const celdaLocalidad = fila.insertCell();
    const botones = fila.insertCell();

    celdaId.innerHTML = `<button id='${paciente.id}' class='btn-table btn-id'>${paciente.id}</button>`;
    celdaNombre.innerHTML = `${paciente.nombre}`;
    celdaApellido.innerHTML = `${paciente.apellido}`;
    celdaDni.innerHTML = `${paciente.dni}`;
    celdaFechaDeAlta.innerHTML = `${paciente.fechaIngreso}`;
    celdaDomicilioId.innerHTML = `${paciente.domicilio.id}`;
    celdaCalle.innerHTML = `${paciente.domicilio.calle}`;
    celdaNumero.innerHTML = `${paciente.domicilio.numero}`;
    celdaLocalidad.innerHTML = `${paciente.domicilio.localidad}`;
    botones.innerHTML = `<button id='${paciente.id}' class="btn-table btn-modificar" onclick='cargarFormModificarPaciente(this.id)'>
                            <a href='#modificar-paciente'>Modificar</a>
                            </button>
                            <button id='${paciente.id}' class="btn-table btn-eliminar" onclick='eliminarPacienteById(this.id)'>
                                Eliminar
                            </button>
                            `;
}
