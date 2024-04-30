



import { addRecord } from "../blockchain/blockchain_controller.js";
import Transaction from "./transaction_model.js";
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;




async function getAllTransactions (){
    console.log("data / getAllTransactions() is invoked");
    try{
        const data = await Transaction.find();
        return {success: true, data: data, message: []};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message: ['An error occurred while fetching transactions.']};
    }
}



async function createTransaction ({amount_paid, message, date_created, source_id, destination_id,cause_id}){
    console.log("data / createTransaction() is invoked")
    console.log({amount_paid, message, date_created, source_id, destination_id,cause_id});
    if(!ObjectId.isValid(destination_id) && !ObjectId.isValid(destination_id) && !ObjectId.isValid(destination_id)) {
        return({success: false, data: {}, message:["Object id is not valid."]});
    }

    try{
        const created_transaction = await Transaction.create({amount_paid, 
            message, date_created, source_id, destination_id, cause_id});
        return {success: true, data: created_transaction, message:[]};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while creating a cause']};
    }
}




// Identical to createTransaction but with adding a record to the blockchain. Can be used for webhook
async function createTransactionAndHash ({amount_paid, message, date_created, source_id, destination_id,cause_id}){
    console.log("data / createTransaction() is invoked")

    if(!ObjectId.isValid(destination_id) && !ObjectId.isValid(destination_id) && !ObjectId.isValid(destination_id)) {
        return({success: false, data: {}, message:["Object id is not valid."]});
    }

    try{
        const created_transaction = await Transaction.create({amount_paid, 
            message, date_created, source_id, destination_id, cause_id});
        
        // Can be commented out in deployed backend if it has TIMEOUT error
        // const blockchainRecord_result = await addRecord({amount_paid, message, date_created, source_id, destination_id,cause_id})
        // let database_transaction_id = created_transaction._id.toString();
        // const saveHashToDatabase_result = await saveHashToDatabase(database_transaction_id ,blockchainRecord_result.data.hash);

        const response = saveHashToDatabase_result;
        return response
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while creating a cause']};
    }
}




async function getInboundUserTransactions(destination_id){
    console.log("data / getInboundUserTransactions() is invoked");

    if(!ObjectId.isValid(destination_id)) return {success: false, data: null, message:['The given destination ID is invalid']};
    // if(!ObjectId.isValid(cause_id)) return {success: false, data: null, message:['The given cause ID is invalid']};


    try{
        const data = await Transaction.find({destination_id: destination_id});
        return {success: true, data: data, message: []};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message: ['An error occurred while fetching transactions.']};
    }
}




async function getOutboundUserTransactions(source_id){
    console.log("data / getOutboundUserTransactions() is invoked")
    if(!ObjectId.isValid(source_id)) return {success: false, data: null, message:['The given source ID is invalid']};
    try{
        const data = await Transaction.find({source_id: source_id});
        return {success: true, data: data, message: []};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message: ['An error occurred while fetching transactions.']};
    }
}




// will be used for adding the transaction hash after writing to the blockchain
async function updateTransaction(transaction){
    console.log("data / updateTransaction() is invoked")
    if(!ObjectId.isValid(transaction._id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const updated_transaction =  await Transaction.findByIdAndUpdate(transaction._id, transaction, {new: true});
        if(updated_transaction) return {success: true, data: updated_transaction, message:[]};
        return {success: false, data: null, message:['There is no User with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while updating a user']};
    }
}

async function saveHashToDatabase(transaction_id, transaction_hash) {
    console.log("data / saveHashToDatabase() has been called.");

    if(!ObjectId.isValid(transaction_id)) return {success: false, data: null, message:['The given ID is invalid']};

    try{        
        const updated_transaction = await Transaction.findByIdAndUpdate( transaction_id,
            { $set: { transaction_hash: transaction_hash } }, 
            { new: true }
        );
        // console.log(updated_transaction);
        if(updated_transaction) return {success: true, data: updated_transaction, message:[]};
        return {success: false, data: null, message:['There is no User with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while updating a user']};
    }
}


console.log("data / user_controller.js has been imported")
export {
    getAllTransactions,
    createTransaction,
    createTransactionAndHash,
    getInboundUserTransactions,
    getOutboundUserTransactions,
    updateTransaction,
    saveHashToDatabase
}