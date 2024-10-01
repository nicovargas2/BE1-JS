import express from 'express'
import moment from 'moment'

const port = 8080

const app = express()

// mejor interpretacion de datos complejos en solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Array de prueba p/ simular contenidos con los que trabajar
const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez', age: 19 },
    { id: 2, firstName: 'Carlos', lastName: 'Perren', age: 19 },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez', age: 19 }
];

//  http://localhost:8080/saludo1


//mandar siempre status y siempre objeto despues
app.get('/saludo1', (req, res) => {
    console.log("endpoint: saludo1")
    res.status(200).send(
        {
            error: null,
            date: moment().format('D MMM, YYYY'),
            saludo: "hola mundo!"
        })
})

//mandar siempre status y siempre objeto despues
app.get('/saludo2', (req, res) => {
    console.log("endpoint: saludo2")
    const response = {
        error: null,
        data: moment().format('D MMM, YYYY'),
        saludo: "hola mundo con objeto!"
    }
    res.status(200).send(response)
})

app.get('/users', (req, res) => {
    res.status(200).send({ error: null, data: users })
})


app.post('/users', (req, res) => {
    console.log("\nImprimo el body");
    console.log(req.body);

    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')) {
        // Math.max nos devuelve el valor máximo de una LISTA
        // Aprovechamos el spread (...) para desestructurar el array devuelto por map
        const maxId = Math.max(...users.map(element => +element.id));
        const newUser = { id: maxId + 1, firstName: req.body.firstName, lastName: req.body.lastName };
        users.push(newUser);
        res.status(200).send({ error: null, data: newUser });
    } else {
        res.status(400).send({
            error: 'Faltan campos obligatorios', message: "not ok", data: []
        });

    }
})

// put / patch = update
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);

    if (index > -1) {
        // Atención!!!, esta es una simplificación, NUNCA utilizaremos el
        // body sin controlarlo previamente.
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

//  delete = delete
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);

    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});






app.listen(port, () => { console.log(`Servidor arriba desde el puerto ${port}`) })



