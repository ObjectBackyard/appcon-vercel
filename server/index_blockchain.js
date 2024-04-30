import express from 'express';
// import router from './network/router.js';
import blockchain_router from './network/blockchain_router.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('static_files'));

app.use('/cache', express.static('cache'))

app.use(blockchain_router);

console.log(`Listening on port ${process.env.PORT}`);
app.listen(process.env.PORT)
// Added this comment to trigger deployment