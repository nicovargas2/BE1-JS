const divide = (val, divider) => {

    return new Promise((resolve, reject) => {

        if (divider === 0) reject("Error: divider is 0!");
        setTimeout(() => {
            resolve(val / divider);
        }, 3000);
    });
}

const myFunctionAsync = async () => {

    try {
        const result = await divide(8, 4)
        console.log(result)
    } catch (error) {
        console.log(error)
    }


}


myFunctionAsync();
console.log("Ejecucion finalizada")