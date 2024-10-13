import { Router } from "express";

const router = Router();

const products = [
    { id: 1, title: "arroz", description: "largo fino", code: "abcd1", price: 101.54, stock: 93, category: "No perecedero" },
    { id: 2, title: "polenta", description: "comun", code: "abcd2", price: 121.15, stock: 43, category: "No perecedero" },
    { id: 3, title: "fideo", description: "moñito", code: "ajnh3", price: 122.35, stock: 3, category: "No perecedero" },
    { id: 4, title: "leche", description: "Descremada", code: "aoki2", price: 99.78, stock: 54, category: "Perecedero" },
    { id: 5, title: "pan", description: "pan de salvado con semillas", code: "qd12e", price: 154.5, stock: 23, category: "Perecedero" },
]

router.get('/', (req, res) => {
    let data = {
        fName: "Hilda",
        lName: "Roldan",
        isAdmin: true,
        //products: products
        products
    };
    res.status(200).render('index', data);
})

export default router;