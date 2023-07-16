const baseUrl = 'http://localhost:8082/odontologos';

const tbodyTablaOdonotologos = $('.tbody');

document.addEventListener('DOMContentLoaded', () => {
    listarTodos();
});

btnRefreshTablaOdontologo.addEventListener('click', () => {
    listarTodos();
});

btnAgregarOdontologo.addEventListener('click', () => {
    sectionFormModificarOdontologo.style.display = 'none';
    sectionFormAgregarOdontologo.style.display = 'block';
});

btnFormAgregarOdontologo.addEventListener('click', (e) => {
    e.preventDefault();

    divErrorAgregarOdontologo.innerHTML = '';
    divErrorAgregarOdontologo.style.display = 'block';

    const settings = {
        nombre: '',
        apellido: '',
        matricula: '',
    };

    // Nombre
    if (
        validarInputMayorACero(inputNombreOdontologo.value) &&
        !validarInputMayorACincuenta(inputNombreOdontologo.value) &&
        validarInputSoloLetras(inputNombreOdontologo.value)
    ) {
        settings.nombre = normalizarTexto(inputNombreOdontologo.value);
    } else {
        // Si hay algún error, activamos la variable errorEnNombre
        errorEnNombre = true;

        if (!validarInputMayorACero(inputNombreOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede quedar vacío</p>
        `;
        } else if (validarInputMayorACincuenta(inputNombreOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede tener más de 50 caracteres</p>
        `;
        } else if (!validarInputSoloLetras(inputNombreOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede contener números o símbolos</p>
        `;
        }
    }

    // Apellido
    if (
        validarInputMayorACero(inputApellidoOdontologo.value) &&
        !validarInputMayorACincuenta(inputApellidoOdontologo.value) &&
        validarInputSoloLetras(inputApellidoOdontologo.value)
    ) {
        settings.apellido = normalizarTexto(inputApellidoOdontologo.value);
    } else {
        if (!validarInputMayorACero(inputApellidoOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede quedar vacío</p>
        `;
        } else if (validarInputMayorACincuenta(inputApellidoOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede tener más de 50 caracteres</p>
        `;
        } else if (!validarInputSoloLetras(inputApellidoOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede contener números o símbolos</p>
        `;
        }
    }

    // Matricula
    if (
        validarInputMayorACero(inputMatriculaOdontologo.value) &&
        !validarInputMayorACincuenta(inputMatriculaOdontologo.value)
    ) {
        settings.matricula = normalizarTexto(inputMatriculaOdontologo.value);
    } else {
        if (!validarInputMayorACero(inputMatriculaOdontologo.value)) {
            divErrorAgregarOdontologo.innerHTML += `
                <p class="error">⚠️ La matricula no puede quedar vacio</p>
            `;
        } else if (
            validarInputMayorACincuenta(inputMatriculaOdontologo.value)
        ) {
            divErrorAgregarOdontologo.innerHTML += `
                <p class="error">⚠️ La matricula no puede tener mas de 50 caracteres</p>
            `;
        }
    }

    if (
        settings.nombre.length > 1 &&
        settings.apellido.length > 1 &&
        settings.matricula.length > 1
    ) {
        divErrorAgregarOdontologo.style.display = 'none';
        agregarOdontologo();
        formularioAgregarOdontologo.reset();
    }
});

btnSearchOdontologos.addEventListener('click', (e) => {
    e.preventDefault();
    listarOdontologoByCriterio(inputSearchOdontologos.value);
});

// GET Todos los Odontologos
async function listarTodos() {
    const res = await fetch(baseUrl);

    const odontologos = await res.json();

    console.log(odontologos.length);

    renderizarOdontologosATabla(odontologos, tbodyTablaOdonotologos);
    validarSiExisteRegistros(odontologos, odontologosTabla, pSinRegistros);
}

// GET Odontologo
async function listarOdontologoById(id) {
    const res = await fetch(`${baseUrl}/${id}`);

    const odontologo = await res.json();

    return odontologo;
}

// GET Odontologo
async function listarOdontologoByCriterio(criterio) {
    const res = await fetch(
        `${baseUrl}/odontologo?criterio=` +
            encodeURIComponent(criterio.toLowerCase())
    );

    console.log(criterio);

    const odontologos = await res.json();

    if (odontologos.length > 0) {
        renderizarOdontologosATabla(odontologos, tbodyTablaOdonotologos);
    } else if (odontologos.length == 1) {
        renderizarPacienteATabla(odontologos, tbodyTablaOdontologos);
    } else {
        console.log('No se encontraron resultados');
        listarTodos();
    }
}

// DELETE Odontologo by ID
async function eliminarOdontologoById(id) {
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

// POST Odontologo
async function agregarOdontologo() {
    const payload = {
        nombre: inputNombreOdontologo.value,
        apellido: inputApellidoOdontologo.value,
        matricula: inputMatriculaOdontologo.value,
    };

    console.log(payload);

    const res = await fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const odontologo = await res.json();

    renderizarOdontologoATabla(odontologo, tbodyTablaOdonotologos);
    listarTodos();
    formularioEnviadoCorrectamente(
        formularioAgregarOdontologo,
        sectionFormAgregarOdontologo,
        divMensajeExitosoAgregarOdontologo,
        '✅ Odontologo Agregado con exito'
    );
}

async function cargarFormModificarOdontologo(id) {
    sectionFormAgregarOdontologo.style.display = 'none';
    sectionFormModificarOdontologo.style.display = 'block';

    const odontologo = await listarOdontologoById(id);
    inputId.value = odontologo.id;
    inputNombreOdontologoModificar.value = odontologo.nombre;
    inputApellidoOdontologoModificar.value = odontologo.apellido;
    inputMatriculaOdontologoModificar.value = odontologo.matricula;
}

// PUT Modificar Odontologo
async function modificarOdontologo() {
    const payload = {
        id: inputId.value,
        nombre: inputNombreOdontologoModificar.value,
        apellido: inputApellidoOdontologoModificar.value,
        matricula: inputMatriculaOdontologoModificar.value,
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
        formularioModificarOdontologo,
        sectionFormModificarOdontologo,
        divMensajeExitosoModificarOdontologo,
        '✅ Odontologo Modificado con exito'
    );
}

btnFormModificarOdontologo.addEventListener('click', (e) => {
    e.preventDefault();

    divErrorModificarOdontologo.innerHTML = '';
    divErrorModificarOdontologo.style.display = 'block';

    const settings = {
        nombre: '',
        apellido: '',
        matricula: '',
    };

    // Nombre
    if (
        validarInputMayorACero(inputNombreOdontologoModificar.value) &&
        !validarInputMayorACincuenta(inputNombreOdontologoModificar.value) &&
        validarInputSoloLetras(inputNombreOdontologoModificar.value)
    ) {
        settings.nombre = normalizarTexto(inputNombreOdontologoModificar.value);
    } else {
        if (!validarInputMayorACero(inputNombreOdontologoModificar.value)) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede quedar vacío</p>
        `;
        } else if (
            validarInputMayorACincuenta(inputNombreOdontologoModificar.value)
        ) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede tener más de 50 caracteres</p>
        `;
        } else if (
            !validarInputSoloLetras(inputNombreOdontologoModificar.value)
        ) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Nombre no puede contener números o símbolos</p>
        `;
        }
    }

    // Apellido
    if (
        validarInputMayorACero(inputApellidoOdontologoModificar.value) &&
        !validarInputMayorACincuenta(inputApellidoOdontologoModificar.value) &&
        validarInputSoloLetras(inputApellidoOdontologoModificar.value)
    ) {
        settings.apellido = normalizarTexto(
            inputApellidoOdontologoModificar.value
        );
    } else {
        if (!validarInputMayorACero(inputApellidoOdontologoModificar.value)) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede quedar vacío</p>
        `;
        } else if (
            validarInputMayorACincuenta(inputApellidoOdontologoModificar.value)
        ) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede tener más de 50 caracteres</p>
        `;
        } else if (
            !validarInputSoloLetras(inputApellidoOdontologoModificar.value)
        ) {
            divErrorModificarOdontologo.innerHTML += `
            <p class="error">⚠️ El Apellido no puede contener números o símbolos</p>
        `;
        }
    }

    // Matricula
    if (
        validarInputMayorACero(inputMatriculaOdontologoModificar.value) &&
        !validarInputMayorACincuenta(inputMatriculaOdontologoModificar.value)
    ) {
        settings.matricula = normalizarTexto(
            inputMatriculaOdontologoModificar.value
        );
    } else {
        if (!validarInputMayorACero(inputMatriculaOdontologoModificar.value)) {
            divErrorModificarOdontologo.innerHTML += `
                <p class="error">⚠️ La matricula no puede quedar vacio</p>
            `;
        } else if (
            validarInputMayorACincuenta(inputMatriculaOdontologoModificar.value)
        ) {
            divErrorModificarOdontologo.innerHTML += `
                <p class="error">⚠️ La matricula no puede tener mas de 50 caracteres</p>
            `;
        }
    }

    if (
        settings.nombre.length > 1 &&
        settings.apellido.length > 1 &&
        settings.matricula.length > 1
    ) {
        divErrorModificarOdontologo.style.display = 'none';
        modificarOdontologo();
        formularioModificarOdontologo.reset();
    }
});
