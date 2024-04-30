



import stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Needs to be implemented on top level file but for a yet undetermined reason, it does not work yet.
dotenv.config({path:'../.env'});

const stripe_API = stripe(process.env.STRIPE_API_TEST_KEY)


//  PURPOSE OF THIS MODULE:
//      - Functions related to handling payments using Stripe Checkout
//      - Communicates with Stripe API and returns the data obtained
//      - Note that we need our platform to be registered
//          to be able handle payments for our users for live deployment




// Payload contains
// the price, source_id, destination_id, cause_id, and message
// Handles the payment process of the customer to the cause
async function createCheckoutSession (payload){

    try {

        const price = payload.price;
        const idempotency_key = uuidv4();

        const session = await stripe_API.checkout.sessions.create({
            // added metadata
            metadata: {
              message: payload.message,
              source_id: payload.source_id,
              destination_id: payload.destination_id,
              cause_id: payload.cause_id
            },
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'php',
                product_data: {
                  name: 'Money Donation', 
                },
                // unit_amount is represented by the currency's smallest unit
                unit_amount: price * 100, 
              },
              quantity: 1,
            }],
            mode: 'payment',
            payment_intent_data : {
                transfer_data: {
                    destination : payload.account_id,
                    amount : price * 100,
                }
            }, 
            // Changed success and cancel url to deployed frontend
            success_url : "https://akap-frontend.vercel.app/payment-success",
            cancel_url : "https://akap-frontend.vercel.app/payment-cancel"
          },
          { //Added idempotency key to handle duplicate POST requests
            idempotencyKey: idempotency_key
          }
          );
          return {
            success: true,
            // Data contains the url for the payment form and the id of the checkout session
            data: {payment_url : session.url, session_id : session.id}, 
            message: [`Successful payment. ID: ${session.id}`]
          } 
    } catch (err) {
        return {
            success: false,
            data: null,
            message: [`An error occurred in payment: ${err.message}`]
        }
    }
}



// Can be used for handling success/fail page in frontend
async function getPaymentStatus(session_id){
    try {
        const existing_session = await stripe_API.checkout.sessions.retrieve(session_id)
        return {
            success: true,
            data: {status: existing_session.status, email : existing_session.customer_details.email},
            message : [`Successfully retrieved payment status. ID: ${session_id}`]
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            message: [`An error occurred in retrieving payment status: ${err.message}`]
        }
    }
}




async function webhookPaymentConfirm (request){
    // Signature verification
    const signature = request.headers['stripe-signature']
    // This can change, use Stripe CLI to check for change in endpoint_secret
    const endpoint_secret = process.env.WEBHOOK_SIGNING_SECRET

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, signature, endpoint_secret)
    } catch (err) {
      console.log(err.message);
      return {
        success: false,
        data: null,
        message: [`An error occurred in constructing an event.`]
      }
    }
 
    let session_id, amount_total, donor_email, donor_name, message, cause_id, destination_id, source_id;
    // Can add more events to watch here if needed
    switch(event.type){
      case 'checkout.session.completed':
        const checkoutSessionSuccess = event.data.object;
        session_id = checkoutSessionSuccess.id
        amount_total = (checkoutSessionSuccess.amount_total) / 100
        donor_email = checkoutSessionSuccess.customer_details.email
        donor_name = checkoutSessionSuccess.customer_details.name
        message = checkoutSessionSuccess.metadata.message
        cause_id = checkoutSessionSuccess.metadata.cause_id
        destination_id = checkoutSessionSuccess.metadata.destination_id
        source_id = checkoutSessionSuccess.metadata.source_id
        return {
            success: true,
            data: {
                session_id : session_id,
                amount_total : amount_total,
                donor_name: donor_name,
                donor_email: donor_email,
                message: message,
                cause_id: cause_id,
                destination_id: destination_id,
                source_id: source_id
            },
            message: ['Webhook successfully triggered. Payment details successfully retrieved.']
        }
      default:
        // Other event types will have an unsuccessful response.
        console.log(`Unhandled event type: ${event.type}`);
        return {
            success: false,
            data: null,
            message: [`Webhook triggered. Unhandled event type: ${event.type}`]
        }
    }
}



console.log("bank / payment_controller.js has been imported")
export {
    createCheckoutSession,
    getPaymentStatus,
    webhookPaymentConfirm
}