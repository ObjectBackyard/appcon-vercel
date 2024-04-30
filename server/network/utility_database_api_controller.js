

import {
    deleteAllTransactions,
    deleteAllUsers,
    deleteAllCauses,
    populateCause,
    populateUser,
    populateTransaction
} from './utility_database_controller.js';


const deleteAllTransactionAPI = async (req, res) => {
    const deleteAllTransaction_result = await deleteAllTransactions();

    const response = deleteAllTransaction_result;

    res.send(response)
}

const deleteAllUserAPI = async (req, res) => {
    const deleteAllUser_result = await deleteAllUsers();

    const response = deleteAllUser_result;

    res.send(response)
}

const deleteAllCauseAPI = async (req, res) => {
    const deleteAllCause_result = await deleteAllCauses();

    const response = deleteAllCause_result;

    res.send(response)
}

const populateCauseAPI = async (req, res) => {
    const populateCause_result = await populateCause(req.body.data);
    
    const response = populateCause_result;

    res.send(response);
}

const populateUserAPI = async (req, res) => {
    const populateUser_result = await populateUser(req.body.data);
    
    const response = populateUser_result;

    res.send(response);
}

const populateTransactionAPI = async (req, res) => {

    const populateTransaction_result = await populateTransaction(req.body.data);
    
    const response = populateTransaction_result;

    res.send(response);
}

export {
    deleteAllTransactionAPI,
    deleteAllUserAPI,
    deleteAllCauseAPI,
    populateUserAPI,
    populateCauseAPI,
    populateTransactionAPI
}