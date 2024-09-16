/*
Manejo de archivo con modulo FS

Opcion sincrona

write=si existe, lo pisa.
read
append=agrega texto
delete=borrar
*/

import fs from 'fs';

const TEST_FILE = './test_file_sync.txt';

console.log('*** Inicio: ***');

if (fs.existsSync(TEST_FILE)) {
    console.log('El archivo EXISTE');
    fs.appendFileSync(TEST_FILE, '\n+ 1', 'utf-8');
    console.log('Archivo actualizado.');
} else {
    fs.writeFileSync(TEST_FILE, 'Archivo creado', 'utf-8');
    console.log('Archivo creado.');
}


const content = fs.readFileSync(TEST_FILE, 'utf-8')

console.log('==> Escribo el content:');
console.log(content);

console.log('\n *Fin*');
//fs.unlinkSync(TEST_FILE, 'utf-8');