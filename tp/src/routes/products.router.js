import { Router } from "express";
import fs from 'fs';
import { uploader } from "../uploader.js";

const router = Router();
const PRODUCTS_FILE = './products.json';

const middleWareEndpointLevel = (req, res, next) => {
    console.log("get calling to products endpoint.");
    next();
}

const auth = (req, res, next) => {
    console.log("User must be authenticated");
    next();
}

const middVerifyProductBody = (req, res, next) => {
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('description') && req.body.hasOwnProperty('code') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('stock') && req.body.hasOwnProperty('category')) {
        next();
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
}
const products = [
    { id: 1, title: "arroz", description: "largo fino", code: "abcd1", price: 101.54, status: true, stock: 93, category: "No perecedero", thumbnails: [] },
    { id: 2, title: "polenta", description: "comun", code: "abcd2", price: 121.15, status: true, stock: 43, category: "No perecedero", thumbnails: [] },
    { id: 3, title: "fideo", description: "moñito", code: "ajnh3", price: 122.35, status: true, stock: 3, category: "No perecedero", thumbnails: [] },
    { id: 4, title: "leche", description: "Descremada", code: "aoki2", price: 99.78, status: true, stock: 54, category: "Perecedero", thumbnails: [] },
    { id: 5, title: "pan", description: "pan de salvado con semillas", code: "qd12e", price: 154.5, status: true, stock: 23, category: "Perecedero", thumbnails: [] },
]

function saveProducts() {
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products), 'utf-8', (err) => {
        console.log('products stored!');

        fs.readFile(PRODUCTS_FILE, 'utf-8', (err, content) => {
            if (err) return console.log(err);
            //console.log(content);
        })
    });
}

router.get('/', middleWareEndpointLevel, (req, res) => {
    res.status(200).send({ error: null, data: products })
})

router.get('/:pid', (req, res) => {
    const prod_id = parseInt(req.params.pid)
    const index = products.findIndex(element => element.id === prod_id)

    if (index > -1) {
        res.body = products[index];
        res.status(200).send({ error: null, data: products[index] })
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] })
    }

})

//middleware activos a nivel de endpoint(puedo poner mas, se ejecutan antes de lo que está dentro)
router.post('/', auth, middVerifyProductBody, uploader.single('thumbnail'), (req, res) => {
    const maxId = Math.max(...products.map(element => +element.id));
    const newProduct = { id: maxId + 1, title: req.body.title, description: req.body.description, code: req.body.code, price: parseFloat(req.body.price), status: true, stock: parseInt(req.body.stock), category: req.body.category };
    products.push(newProduct);
    saveProducts();
    res.status(200).send({ error: null, data: newProduct, file: req.file });
});

router.put('/:pid', (req, res) => {

    const prod_id = parseInt(req.params.pid)
    const index = products.findIndex(element => element.id === prod_id)

    if (index > -1) {

        if (req.body.hasOwnProperty('title') && req.body.title != '') {
            products[index].title = req.body.title;
        }

        if (req.body.hasOwnProperty('description') && req.body.description != '') {
            products[index].description = req.body.description;
        }
        if (req.body.hasOwnProperty('code') && req.body.code != '') {
            products[index].code = req.body.code;
        }
        if (req.body.hasOwnProperty('price') && req.body.price != '') {
            products[index].price = parseFloat(req.body.price);
        }
        if (req.body.hasOwnProperty('stock') && req.body.stock != '') {
            products[index].stock = req.body.stock;
        }
        if (req.body.hasOwnProperty('category') && req.body.category != '') {
            products[index].category = req.body.category;
        }
        saveProducts();
        res.status(200).send({ error: null, data: products[index] })
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] })
    }
});

router.delete('/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const index = products.findIndex(element => element.id === id);

    if (index > -1) {
        products.splice(index, 1);
        saveProducts();
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

export default router;
