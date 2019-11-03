const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
    let dataContent = JSON.stringify(listadoPorHacer);

    const data = new Uint8Array(Buffer.from(dataContent));
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar', err);
    });
};

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

module.exports = {
    crear
};