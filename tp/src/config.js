import * as url from 'url';

const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    get CARTS_DIR() { return `${this.DIRNAME}database/carts.json` },
    get PRODUCTS_DIR() { return `${this.DIRNAME}database/products.json` }
};

export default config;