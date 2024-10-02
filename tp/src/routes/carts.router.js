import { Router } from "express";

const router = Router();

const carts = [
    {},
]

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: carts })
})
router.get('/:pid', (req, res) => {
    res.status(200).send({ error: null, data: "devuelve un pid" })
})

export default router;
