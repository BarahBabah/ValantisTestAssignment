import md5 from 'md5';
export const API_URL = 'https://api.valantis.store:41000';
const PASSWORD = 'Valantis';

const timestamp = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
export const authString = md5(`${PASSWORD}_${timestamp}`);
console.log(authString);