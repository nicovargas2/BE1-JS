import config from '../config.js';
import fs from 'fs';

export class iocarts {

    constructor() {
        this.file = config.CARTS_DIR
    }

    async init() {
        try {
            const exists = await fs.promises.access(this.file);
            console.log('El archivo existe');
        } catch (err) {
            console.log('El archivo NO existe');
            await fs.promises.writeFile(this.file, JSON.stringify([]));
        }
    }

    async saveCarts(cartsArray) {
        await fs.promises.writeFile(this.file, JSON.stringify(cartsArray), 'utf-8', (err) => {
            console.log('carts stored!');

            fs.readFile(this.file, 'utf-8', (err, content) => {
                if (err) return console.log(err);
                console.log(content);
            })
        });
    }

    async retrieveCarts() {
        const cartsRetrieved = await fs.promises.readFile(this.file, 'utf-8');
        try {
            const cartsJSON = JSON.parse(cartsRetrieved)
            return cartsJSON
        } catch (error) {
            console.log("pasa por el error")
            const array = []
            return array
        }
    }


    getCarts() {
        return this.retrieveCarts();
    }
}

//export default iocarts;