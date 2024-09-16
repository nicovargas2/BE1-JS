const divideAlt = (val, divider) => {
    return new Promise((resolve, reject) => {

        if (divider === 0) reject("Error: divider is 0!");
        resolve(val / divider);
    })
}

console.log('Una promesa en sí, devuelta:')
console.log(divideAlt(10, 2))




const divide = (val, divider) => {

    return new Promise((resolve, reject) => {

        if (divider === 0) reject("Error: divider is 0!");
        resolve(val / divider);
    });
}


console.log('\n\nComo sí debe usarse una promesa:');

divide(10, 2)
    .then((result) => {
        console.log("Promesa resuelta")
        console.log(result)
    })
    .catch((err) => {
        console.log("Promesa rechazada!")
        console.log(err)
    })
    .finally(() => {
        console.log('Finally')
    })



