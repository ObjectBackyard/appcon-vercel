



import {
    createCheckoutSession,
    getPaymentStatus,
    webhookPaymentConfirm
} from '../bank/payment_controller.js'

import { createTransactionAndHash } from '../data/transaction_controller.js';




const createCheckoutSessionAPI = async (req,res) =>{
    
    const createCheckoutSession_result = await createCheckoutSession(req.body)

    const response = {
        success: createCheckoutSession_result.success,
        data: createCheckoutSession_result.data,
        message : createCheckoutSession_result.message
    }

    res.send(response)
}





const getPaymentStatusAPI = async (req,res) =>{
    const {session_id} = req.query
    const webhookPaymentConfirm_result = await getPaymentStatus(session_id);

    const response = {
        success: webhookPaymentConfirm_result.success,
        data: webhookPaymentConfirm_result.data,
        message : webhookPaymentConfirm_result.message
    }

    res.send(response)
}



// Request payload is taken care of by Stripe API
const webhookPaymentConfirmAPI = async (req,res) =>{
    const webhookPaymentConfirm_result = await webhookPaymentConfirm(req)
    let createTransaction_result
    // Added check if event is checkout.session.completed
    if(webhookPaymentConfirm_result.success){
        //if checkout session is complete, proceed to createTransaction
        createTransaction_result = await createTransactionAndHash(
            {
                amount_paid: webhookPaymentConfirm_result.data.amount_total,
                message: webhookPaymentConfirm_result.data.message,
                date_created: new Date(),
                source_id: webhookPaymentConfirm_result.data.source_id,
                destination_id: webhookPaymentConfirm_result.data.destination_id,
                cause_id: webhookPaymentConfirm_result.data.cause_id        
            }
        )

        const response = {
            success: createTransaction_result.success,
            data: createTransaction_result.data,
            message : createTransaction_result.message
        }

        res.send(response)
    }else{
        const response = {
            success: webhookPaymentConfirm_result.success,
            data: webhookPaymentConfirm_result.data,
            message : webhookPaymentConfirm_result.message
        }
        res.send(response)
    }
}




export {
    createCheckoutSessionAPI,
    getPaymentStatusAPI,
    webhookPaymentConfirmAPI
}