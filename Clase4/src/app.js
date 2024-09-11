const MIN = 1
const MAX = 20
const QUANTITY = 10

const generateRandomInt1 = async (min, max) => {
    //lo podría hacer así, pero el ejercicio pide que se pueda esperar
    //return Math.floor(Math.random() * max) + min
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * max) + min);
        }, 1000);
    })
}


//si estoy dentro del flujo principal... (ver explicacion minuto 54)
//no hace falta ponerle el async, es asincrono ya por defecto.
//el modulo app.js


//Si quiero usar el otro, tengo que poner async


//const generateNumbersPackage = () => {   con esta linea me hace error
const generateNumbersPackage = async () => {
    for (let i = 0; i < QUANTITY; i++) {
        let number = await generateRandomInt1(MIN, MAX);
        console.log("i: ", i)
        console.log(number)
    }
}


generateNumbersPackage()


// Flujo principal
/*
for (let i = 0; i < QUANTITY; i++) {
    let number = await generateRandomInt1(MIN, MAX);
    console.log("i: ", i)
    console.log(number)
}
*/
