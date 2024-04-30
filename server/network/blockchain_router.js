



// general imports
import express from 'express';

import {
    createTransactionBlockchainAPI,
    getRecordByHashAPI,
    homeBlockchainTest
} from './blockchain_api_controller.js';





// Use express.Router() instead of express()
const blockchain_router = express.Router();

blockchain_router.post("/api/create-transaction-blockchain", createTransactionBlockchainAPI);
blockchain_router.get("/api/get-record-by-hash", getRecordByHashAPI);
// blockchain_router.get("/", homeBlockchainTest);



export default blockchain_router;