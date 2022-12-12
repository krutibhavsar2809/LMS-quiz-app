const CryptoJS = require('crypto-js');

export const encrypt = (text) => (CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text)));

export const decrypt = (data) => (CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8));

export const getItemFromLocalStorage = (key) => (JSON.parse(localStorage.getItem(key)));

export const setItemToLocalStorage = (key, data) => (localStorage.setItem(key, JSON.stringify(data)));

export const isAdmin = (email, password) => (email === 'kruti@gmail.com' && decrypt(password) === '@Test123');