const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
    let dataContent = JSON.stringify(listadoPorHacer);

    const data = new Uint8Array(Buffer.from(dataContent));
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar', err);
    });
};


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
};


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();
    let borrado = false;
    listadoPorHacer = listadoPorHacer.filter(tarea => {
        if (descripcion === tarea.descripcion) {
            borrado = true
            return false;
        } else {
            return true
        }
    });

    guardarDB();

    return borrado;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};