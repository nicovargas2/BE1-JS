import { Router } from "express";

const router = Router();

const products = [
    {},
]


router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: products })
})

router.get('/:pid', (req, res) => {
    res.status(200).send({ error: null, data: "devuelve un pid" })
})

export default router;
