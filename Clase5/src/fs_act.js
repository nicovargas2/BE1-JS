import moment from 'moment';
import fs from 'fs';

const DATE_FILE = './date_to_file.txt';
const CURRENT_DATE = moment().toString();

console.log(CURRENT_DATE);

fs.writeFile(DATE_FILE, CURRENT_DATE, 'utf-8', (err) => {
    console.log('date stored!');

    fs.readFile(DATE_FILE, 'utf-8', (err, content) => {
        if (err) return console.log(err);

        console.log(content);
    })
});