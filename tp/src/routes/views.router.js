import { Router } from "express";
import { ioproducts } from "../utils/ioproducts.js";

const router = Router();

const my_ioproducts = new ioproducts()
my_ioproducts.init();

router.get('/', async (req, res) => {
    const products = await my_ioproducts.getProducts()
    let data = {
        fName: "Hilda",
        lName: "Roldan",
        isAdmin: true,
        //products: products
        products
    };
    res.status(200).render('home', data);
})

router.get('/chat', (req, res) => {
    const data = {
    };
    res.status(200).render('chat', data);
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await my_ioproducts.getProducts()
    let data = {
        fName: "Hilda",
        lName: "Roldan",
        isAdmin: true,
        products
    };
    res.status(200).render('realTimeProducts', data);
})

export default router;