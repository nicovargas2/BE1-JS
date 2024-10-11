import express from 'express'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import config from './config.js';

const app = express()

//el next() es propio de express, ya se encarga de inyectarlo.
const midd1 = (req, res, next) => {
    console.log("se recibio una solicitud");

    //y despues segui con la cadena, con lo que venga despues.
    next();
}

//ejecuta estos middlewares primero.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/static', express.static(`${config.DIRNAME}/public`));
app.use('/static/load', express.static(`${config.DIRNAME}/public/productForm.html`));
// app.use('/static/arrozMarolio', express.static(`${config.DIRNAME}/public/img/arroz.webp`));
// o puedo poner asi directamente http://localhost:8080/static/img/arroz.webp
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(config.PORT, () => {
    console.log(`Server running using port: ${config.PORT}`)
});
