import Transaction from "../data/transaction_model.js";
import Cause from "../data/cause_model.js";
import User from "../data/user_model.js";

import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;


async function deleteAllTransactions() {
    
    try {
        const deletedTransactions = await Transaction.deleteMany({});

        return {
            success: true,
            data: deletedTransactions,
            message: ["Successfully deleted all transactions."]
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            message: ["Unable to delete all transactions."]
        };
    }
}

async function deleteAllUsers() {
    try {
        const deletedUsers = await User.deleteMany({});

        return {
            success: true,
            data: deletedUsers,
            message: ["Successfully deleted all users."]
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            message: ["Unable to delete all users."]
        };
    }
}

async function deleteAllCauses() {
    try {
        const deletedCauses = await Cause.deleteMany({});

        return {
            success: true,
            data: deletedCauses,
            message: ["Successfully deleted all causes."]
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            message: ["Unable to delete all causes."]
        };
    }
}

async function populateCause(causeArray) {
    try {
        const insertedCauses = await Cause.insertMany(causeArray);

        return {
            success: true,
            data: insertedCauses,
            message: ["Successfully populated causes."]
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            data: null,
            message: ["Unable to populate all causes."]
        };
    }
}

async function populateTransaction(transactionArray) {
    try {
        const insertedTransaction = await Transaction.insertMany(transactionArray);

        return {
            success: true,
            data: insertedTransaction,
            message: ["Successfully populated transaction."]
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            message: ["Unable to populate all transaction."]
        };
    }
}


async function populateUser(userArray) {
    try {
        const insertedUsers = await User.insertMany(userArray);

        return {
            success: true,
            data: insertedUsers,
            message: ["Successfully populated users."]
        };
    } catch (err) {
        return {
            success: false,
            data: err,
            message: ["Unable to populate all users."]
        };
    }
}

export {
    deleteAllTransactions,
    deleteAllUsers,
    deleteAllCauses,
    populateCause,
    populateUser,
    populateTransaction
}