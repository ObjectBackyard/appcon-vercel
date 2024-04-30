import {
    setupCredentials,
    addRecord,
    readRecord,
    readRecordByHash
} from "../blockchain/blockchain_controller.js";




const createTransactionBlockchainAPI = async (req,res) => {
    // const createTransaction_result = createTransaction(req.body)
    console.log("createTransactionBlockchainAPI has been called.");

    const addRecord_result = await addRecord(req.query);

    const response = { ...addRecord_result };
    
    res.send(response)
}


const getRecordByHashAPI = async (req, res) => {
    
    const readRecordByHash_result = await readRecordByHash(req.query);
    // console.log(req.query);

    res.send(readRecordByHash_result);
}

const homeBlockchainTest = async (req, res) => {
    res.send("Test");
}

export {
    createTransactionBlockchainAPI,
    getRecordByHashAPI,
    homeBlockchainTest
}