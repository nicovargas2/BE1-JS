let numbers = [1, 2, 3, 4, 5]

function multiplyX2(x) {
    return x * 2
}

const updatedNumbers2 = numbers.map(multiplyX2)

//arrow simplificado
const updatedNumbers3 = numbers.map(param => param * 3)

//arrow completo pq tiene mas de 1 param
let times = 4
const updatedNumbers4 = numbers.map((x, times) => {
    return x * times
})

console.log(updatedNumbers2)
console.log(updatedNumbers3)
console.log(updatedNumbers4)


// Promesas


