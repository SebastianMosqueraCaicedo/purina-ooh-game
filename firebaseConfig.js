const {initializeApp,cert} = require('firebase-admin/app');

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//----------------------------- Create your Private Key
const serviceAccount = require('./eco-apps-firebase-adminsdk-uqowq-a842951e7c.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;