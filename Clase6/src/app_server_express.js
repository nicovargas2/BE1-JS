import express from 'express'

const PORT = 8080

const APP = express()


//este es el basico, en el siguiente lo completamos. Adentro, no hay nada mas que un arrow function
// APP.get('', () => { })
APP.get('/saludo', (req, res) => {
    console.log("endpoint: saludo")
    res.send("Hola a todos, pero ahora desde express!")
})

//app.get es un endpoint de tipo 'get'
//hay otros como post, put, patch, delete

APP.get('/', (req, res) => {
    console.log(req)
    res.send("Le pegó al raíz!")
})

// El app.get configura el endpoint, pero no esta levantado el servidor escuchando. Esto se hace asi: con app.listen



//parametros
APP.get('/unparam/:nombre', (req, res) => {
    res.send(`Welcome, ${req.params.name}`)
})

// REQ PARAMS

// siempre que haya un : no es un literal, express lo reemplaza por un parametro. Se debe llamar igual en el resto del proc.
// podemos recibir varios parametros. Siempre se recibe como string asi que a veces hay que hacer un parse de la info.
APP.get('/por2/:val', (req, res) => {
    console.log('Solicitud requerida para multiplicar por 2')
    let calc = parseInt(req.params.val) * 2
    res.send(`Valor ${req.params.val} multiplicado por 2: ${calc}`)
})

// REQ QUERY

// http://localhost:8080/calculate?val=2&mult=98
APP.get('/calculate', (req, res) => {
    console.log('Solicitid recibida para calcular');
    const calc = parseInt(req.query.val) * parseInt(req.query.mult);
    res.send(`El calculado solicitado de ${req.query.val} * ${req.query.mult} es= ${calc}`)
})


APP.listen(PORT, () => { console.log(`Servidor arriba desde el puerto ${PORT}`) })

//si abro el chrome y le pego acá: http://localhost:8080/saludo
//veo la res.send de la api /saludo

