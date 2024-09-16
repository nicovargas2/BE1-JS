/*
Manejo de archivo con modulo FS

Opcion callback

write=si existe, lo pisa.
read
append=agrega texto
delete=borrar
*/

import fs from 'fs';

const TEST_FILE = './test_file_callback.txt';

console.log('*** Inicio: ***');

fs.writeFile(TEST_FILE, 'Marca archivo creado\n', 'utf-8', (err) => {

    if (err) return console.log(err);

    
});




const content = fs.readFileSync(TEST_FILE, 'utf-8')

console.log('==> Escribo el content:');
console.log(content);

console.log('\n *Fin*');
//fs.unlinkSync(TEST_FILE, 'utf-8');