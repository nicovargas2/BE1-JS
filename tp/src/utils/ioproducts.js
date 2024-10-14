import config from '../config.js';
import fs from 'fs';

export class ioproducts {

    constructor() {
        this.file = config.PRODUCTS_DIR
    }

    async init() {
        try {
            const exists = await fs.promises.access(this.file);
            //console.log('El archivo existe');
        } catch (err) {
            //console.log('El archivo NO existe');
            const products = [
                { id: 1, title: "arroz", description: "largo fino", code: "abcd1", price: 101.54, status: true, stock: 93, category: "No perecedero", thumbnails: [] },
                { id: 2, title: "polenta", description: "comun", code: "abcd2", price: 121.15, status: true, stock: 43, category: "No perecedero", thumbnails: [] },
                { id: 3, title: "fideo", description: "moñito", code: "ajnh3", price: 122.35, status: true, stock: 3, category: "No perecedero", thumbnails: [] },
                { id: 4, title: "leche", description: "Descremada", code: "aoki2", price: 99.78, status: true, stock: 54, category: "Perecedero", thumbnails: [] },
                { id: 5, title: "pan", description: "pan de salvado con semillas", code: "qd12e", price: 154.5, status: true, stock: 23, category: "Perecedero", thumbnails: [] },
            ]
            await fs.promises.writeFile(this.file, JSON.stringify(products));
        }
    }

    async saveProducts(productsArray) {
        await fs.promises.writeFile(this.file, JSON.stringify(productsArray), 'utf-8', (err) => {
            console.log('  products stored!');

            fs.readFile(this.file, 'utf-8', (err, content) => {
                if (err) return console.log(err);
                console.log(content);
            })
        });
    }

    async retrieveProducts() {
        const productsRetrieved = await fs.promises.readFile(this.file, 'utf-8');
        try {
            const productsJSON = JSON.parse(productsRetrieved)
            return productsJSON
        } catch (error) {
            const array = []
            return array
        }
    }


    getProducts() {
        return this.retrieveProducts();
    }
}