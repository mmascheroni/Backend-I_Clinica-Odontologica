function validarSiExisteRegistrosTBody(tbody, tabla, parafoMensajeSinDatos) {
    let mensaje = 'No hay registros actualmente...';

    if (tbody.children.length === 0) {
        tabla.style.display = 'none';
        parafoMensajeSinDatos.style.display = 'block';
        parafoMensajeSinDatos.innerHTML = '';
        parafoMensajeSinDatos.innerHTML = mensaje;
    } else {
        tabla.style.display = 'block';
        parafoMensajeSinDatos.style.display = 'none';
    }
}

function validarSiExisteRegistros(arreglo, tabla, parafoMensajeSinDatos) {
    let mensaje = 'No hay registros actualmente...';

    if (arreglo.length === 0) {
        tabla.style.display = 'none';
        parafoMensajeSinDatos.style.display = 'block';
        parafoMensajeSinDatos.innerHTML = '';
        parafoMensajeSinDatos.innerHTML = mensaje;
    } else {
        tabla.style.display = 'block';
        parafoMensajeSinDatos.style.display = 'none';
    }
}
