



// general imports
import express from 'express';
import {
  setCORSHeader,
  root,
} from './server_controller.js';




//  all API functions for the Cause entity
import {
  getAllCausesAPI,
  fuzzySearchAPI,
  createCauseAPI,
  getCausesByUserAPI,
  updateCauseAPI,
  deleteCauseAPI,
  searchCauseAPI,
  searchCauseByUserAPI,
  sortCausesAPI,
  getCauseAPI,
  getTotalAmountAPI
} from './cause_api_controller.js';




//  all API function for the User entity
import {
  getAllUsersAPI,
  createAccountAPI,
  logInAPI,
  logOutAPI,
  editAccountAPI,
  getUserAPI,
  deleteUserAPI,
  searchUserAPI,
  getUserTransactionStatisticsAPI
} from './user_api_controller.js'




//  all API functions exclusive to the Moderator entity
import {
  blacklistAccountAPI,
  removeCauseAPI
} from './moderator_api_controller.js'



// All API functions for Stripe Connect
import {
  createStripeAccountAPI,
  getAllStripeAccountsAPI,
  getStripeAccountAPI,
  updateStripeAccountAPI,
  deleteStripeAccountAPI,
  accountCreationReauthAPI
} from './stripeAccount_api_controller.js'



// All API functions for handling payment
import{
  createCheckoutSessionAPI,
  getPaymentStatusAPI,
  webhookPaymentConfirmAPI
} from './payment_api_controller.js'




// all API function for the Transaction entity
import{
  getAllTransactionsAPI,
  createTransactionAPI,
  getInboundUserTransactionsAPI,
  getOutboundUserTransactionsAPI,
  updateTransactionAPI
}from './transaction_api_controller.js'


import { getRecordByHashAPI } from './blockchain_api_controller.js';
import { verifyToken } from '../data/utility.js';
import {uploadImage, uploadMultipleImages} from './image-upload.js';

import {
    deleteAllTransactionAPI,
    deleteAllUserAPI,
    deleteAllCauseAPI,
    populateCauseAPI,
    populateUserAPI,
    populateTransactionAPI
} from "./utility_database_api_controller.js";


// Use express.Router() instead of express()
const router = express.Router();


//  MIDDLEWARE
router.use(setCORSHeader);






//  **************************************** ROUTES and FUNCTIONS ****************************************
router.get("/", root);
router.post("/api/upload-image",uploadImage);
router.post("/api/upload-multiple-images",uploadMultipleImages);

//  Cause API
router.get("/api/get-all-causes", getAllCausesAPI); // for testing only, remove before deployment
router.post("/api/fuzzy-search-causes", fuzzySearchAPI);
router.post("/api/create-cause", createCauseAPI);
router.get("/api/get-causes-by-user/:user_id", getCausesByUserAPI);
router.post("/api/update-cause", updateCauseAPI);
router.delete("/api/delete-cause", deleteCauseAPI);
router.get("/api/search-cause", searchCauseAPI);
router.get("/api/search-cause-by-user/:user_id", searchCauseByUserAPI);
router.post("/api/sort-cause", sortCausesAPI); // may question ako dito, what if sa client side na ito?
router.get("/api/get-cause/:cause_id", getCauseAPI);
router.get("/api/get-cause-total-amount", getTotalAmountAPI);


//  User API
router.get("/api/get-all-users", getAllUsersAPI); // for testing only, remove before deployment
router.post("/api/create-account", createAccountAPI);
router.post("/api/log-in", logInAPI);
router.post("/api/log-out", logOutAPI);
router.post("/api/edit-account", editAccountAPI);
router.post("/api/get-user", getUserAPI);
router.delete("/api/delete-user", deleteUserAPI);
router.get("/api/search-user", searchUserAPI);
router.get("/api/get-user-statistics", getUserTransactionStatisticsAPI);
router.get("/api/verify-user",verifyToken)


//  Moderator API
router.post("/api/blacklist-account", blacklistAccountAPI);
router.post("/api/remove-cause", removeCauseAPI);

// Bank API
router.post("/api/create-stripe-account", createStripeAccountAPI);
router.post("/api/account-creation-reauth/:accountID",  accountCreationReauthAPI)
router.get("/api/get-all-stripe-accounts", getAllStripeAccountsAPI); // for test only
router.get("/api/get-stripe-account", getStripeAccountAPI);
router.post("/api/update-stripe-account", updateStripeAccountAPI);
router.delete("/api/delete-stripe-account", deleteStripeAccountAPI);
router.post("/api/create-checkout-session", createCheckoutSessionAPI);
router.get("/api/get-payment-status", getPaymentStatusAPI);
router.post("/api/webhook-payment-confirm", express.raw({type:'application/json'}),webhookPaymentConfirmAPI);



// Transaction API
router.get("/api/get-all-transactions",getAllTransactionsAPI);
router.post("/api/create-transaction",createTransactionAPI);
router.get("/api/get-inbound-transactions",getInboundUserTransactionsAPI);
router.get("/api/get-outbound-transactions",getOutboundUserTransactionsAPI);
router.put("/api/update-transaction",updateTransactionAPI);


// Blockchain API
router.get("/api/get-record-by-hash", getRecordByHashAPI);

// Database Utility API
router.post("/api/delete-all-transactions", deleteAllTransactionAPI);
router.post("/api/delete-all-users", deleteAllUserAPI);
router.post("/api/delete-all-causes", deleteAllCauseAPI);
router.post("/api/populate-transactions", populateTransactionAPI);
router.post("/api/populate-users", populateUserAPI);
router.post("/api/populate-causes", populateCauseAPI);

export default router;