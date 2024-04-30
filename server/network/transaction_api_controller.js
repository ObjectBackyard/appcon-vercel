



import { response } from 'express';
import { addRecord } from '../blockchain/blockchain_controller.js';

import{
    getAllTransactions,
    createTransaction,
    getInboundUserTransactions,
    getOutboundUserTransactions,
    updateTransaction,
    saveHashToDatabase,
    getTransactionByCause
} from '../data/transaction_controller.js';

const getAllTransactionsAPI = async (req, res) => {
    const getAllTransactions_result = await getAllTransactions();

    const response = {
        success: getAllTransactions_result.success,
        data: getAllTransactions_result.data,
        message: getAllTransactions_result.message,
    }

    res.send(response)
}





// Added getTransactionByCause operation
const getTransactionByCauseAPI = async(req,res) =>{

    const {cause_id} = req.params

    const getTransactionByCause_result = await getTransactionByCause(cause_id)

    const response = {
        success: getTransactionByCause_result.success,
        data: getTransactionByCause_result.data,
        message: getTransactionByCause_result.message,
    }

    res.send(response)
}




const createTransactionAPI = async (req,res) => {
    const createTransaction_result = await createTransaction(req.body)
    // console.log(req.body);

    const blockchainRecord_result = await addRecord(req.body);
    let database_transaction_id = response.data._id.toString();
    const saveHashToDatabase_result = await saveHashToDatabase(database_transaction_id ,blockchainRecord_result.data.hash);

    const response = saveHashToDatabase_result;

    res.send(response)

    // res.on('finish', async () => {
            
    // })
    
}




const getInboundUserTransactionsAPI = async (req,res) => {
    // console.log(req.query);
    const {destination_id} = req.query;


    const getInboundUserTransactions_result = await getInboundUserTransactions(destination_id);

    const response = {
        success: getInboundUserTransactions_result.success,
        data: getInboundUserTransactions_result.data,
        message: [...getInboundUserTransactions_result.message],
    };

    res.send(response);
}




const getOutboundUserTransactionsAPI = async (req,res) => {
    const {source_id} = req.query;

    const getOutboundUserTransactions_result = await getOutboundUserTransactions(source_id);

    const response = {
        success: getOutboundUserTransactions_result.success,
        data: getOutboundUserTransactions_result.data,
        message: [...getOutboundUserTransactions_result.message],
    };

    res.send(response)
}



// Irrelevant
const updateTransactionAPI = async (req,res) => {
    const updateTransaction_result = await updateTransaction(req.body);

    const response = {
        success: updateTransaction_result.success,
        data: updateTransaction_result.data,
        message: [...updateTransaction_result.message],
    };

    res.send(response);
}





export{
    getAllTransactionsAPI,
    createTransactionAPI,
    getInboundUserTransactionsAPI,
    getOutboundUserTransactionsAPI,
    updateTransactionAPI,
    getTransactionByCauseAPI
}