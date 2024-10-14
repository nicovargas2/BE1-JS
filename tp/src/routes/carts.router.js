import { Router } from "express";
import { iocarts } from "../utils/iocarts.js";

const router = Router();

const my_iocarts = new iocarts()
my_iocarts.init();

router.get('/', async (req, res) => {
    const carts = await my_iocarts.getCarts()
    res.status(200).send({ error: null, data: carts })
})

router.get('/:cid', async (req, res) => {
    const carts = await my_iocarts.getCarts()
    const cart_id = parseInt(req.params.cid)
    const index = carts.findIndex(element => element.id === cart_id)

    if (index > -1) {
        res.body = carts[index];
        res.status(200).send({ error: null, data: carts[index] })
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] })
    }

})

router.post('/', async (req, res) => {
    const carts = await my_iocarts.getCarts()

    if (req.body.hasOwnProperty('products')) {
        let maxId = 0
        if (carts.length > 0) {
            maxId = Math.max(...carts.map(element => +element.id));
        }
        const newCart = { id: maxId + 1, products: req.body.products };
        carts.push(newCart);
        my_iocarts.saveCarts(carts)
        res.status(200).send({ error: null, data: newCart });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const carts = await my_iocarts.getCarts()

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
        //saveCarts()
        my_iocarts.saveCarts(carts)
        res.status(200).send({ error: null, data: carts[indexCart] });
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] });
    }
});

export default router;
