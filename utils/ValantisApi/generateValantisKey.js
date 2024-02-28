import md5 from 'md5';
export const API_URL = 'http://api.valantis.store:40000';
const PASSWORD = 'Valantis';

const timestamp = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
export const authString = md5(`${PASSWORD}_${timestamp}`);