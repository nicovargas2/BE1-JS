import { Router } from "express";
import fs from 'fs';

const router = Router();

const CARTS_FILE = './carts.json';

const carts = [
    {
        id: 1,
        products: [
            { product: 101, quantity: 1 },
            { product: 102, quantity: 2 }
        ]
    },
    {
        id: 2,
        products: [
            { product: 103, quantity: 3 },
            { product: 104, quantity: 4 }
        ]
    }
];


function saveCarts() {
    fs.writeFile(CARTS_FILE, JSON.stringify(carts), 'utf-8', (err) => {
        console.log('carts stored!');

        fs.readFile(CARTS_FILE, 'utf-8', (err, content) => {
            if (err) return console.log(err);
            console.log(content);
        })
    });
}

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: carts })
})

router.get('/:cid', (req, res) => {
    const cart_id = parseInt(req.params.cid)
    const index = carts.findIndex(element => element.id === cart_id)

    if (index > -1) {
        res.body = carts[index];
        res.status(200).send({ error: null, data: carts[index] })
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] })
    }

})

router.post('/', (req, res) => {
    if (req.body.hasOwnProperty('products')) {
        const maxId = Math.max(...carts.map(element => +element.id));
        const newCart = { id: maxId + 1, products: req.body.products };
        carts.push(newCart);
        saveCarts()
        res.status(200).send({ error: null, data: newCart });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.post('/:cid/product/:pid', (req, res) => {

    const cartIdSearched = parseInt(req.params.cid);
    const prodIdSearched = parseInt(req.params.pid);
    const indexCart = carts.findIndex(element => element.id === cartIdSearched);

    if (indexCart > -1) {
        //Existe el carrito, validar el producto
        const indexProd = carts[indexCart].products.findIndex(element => element.product === prodIdSearched);

        if (indexProd > -1) {
            carts[indexCart].products[indexProd].quantity++;
        } else {
            const newProduct = { product: prodIdSearched, quantity: 1 };
            carts[indexCart].products.push(newProduct);
        }
        saveCarts()
        res.status(200).send({ error: null, data: carts[indexCart] });
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] });
    }
});

export default router;
