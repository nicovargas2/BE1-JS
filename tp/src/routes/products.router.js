import { Router } from "express";
import { uploader } from "../uploader.js";
import { ioproducts } from "../utils/ioproducts.js";

const router = Router();
const my_ioproducts = new ioproducts()
my_ioproducts.init();

const middleWareEndpointLevel = (req, res, next) => {
    console.log("get calling to products endpoint.");
    next();
}

const auth = (req, res, next) => {
    console.log("User must be authenticated");
    next();
}

const middVerifyProductBody = (req, res, next) => {
    if (req.body.title != '' && req.body.description != '' && req.body.price > 0 && req.body.stock > 0) {
        next();
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
}

router.get('/', middleWareEndpointLevel, async (req, res) => {
    const products = await my_ioproducts.getProducts()
    if (req.query.limit) {
        const newArray = products.slice(0, req.query.limit)
        res.status(200).send({ error: null, data: newArray })
    }
    else {
        res.status(200).send({ error: null, data: products })
    }
})

router.get('/:pid', async (req, res) => {
    const products = await my_ioproducts.getProducts()
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
router.post('/', auth, uploader.single('thumbnail'), middVerifyProductBody, async (req, res) => {
    const products = await my_ioproducts.getProducts()
    let maxId = 0
    if (products.length > 0) {
        maxId = Math.max(...products.map(element => +element.id));
    }
    const newProduct = { id: maxId + 1, title: req.body.title, description: req.body.description, code: req.body.code, price: parseFloat(req.body.price), status: true, stock: parseInt(req.body.stock), category: req.body.category };
    products.push(newProduct);
    my_ioproducts.saveProducts(products);

    // Recuperamos la instancia global de socketServer para poder realizar un emit
    const socketServer = req.app.get('socketServer');
    socketServer.emit('new_product_arrived', newProduct);

    //continua con el flujo
    res.status(200).send({ error: null, data: newProduct, file: req.file });
});

router.put('/:pid', async (req, res) => {
    const products = await my_ioproducts.getProducts()

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
        my_ioproducts.saveProducts(products);
        res.status(200).send({ error: null, data: products[index] })
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] })
    }
});

router.delete('/:pid', async (req, res) => {
    const products = await my_ioproducts.getProducts()
    const id = parseInt(req.params.pid);
    const index = products.findIndex(element => element.id === id);

    if (index > -1) {
        products.splice(index, 1);
        my_ioproducts.saveProducts(products);
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

export default router;
