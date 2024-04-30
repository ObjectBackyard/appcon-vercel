



import stripe from 'stripe';
import dotenv from 'dotenv';
// Needs to be implemented on top level file but for a yet undetermined reason, it does not work yet.
dotenv.config({path:'../.env'});


const stripe_API = stripe(process.env.STRIPE_API_TEST_KEY)


//  PURPOSE OF THIS MODULE:
//      - Functions related to Stripe connected accounts
//      - Communicates with Stripe API and returns the data obtained
//      - Note that we need our platform to be registered
//          to be able to create and handle accounts for our users




// Creates a a Stripe Account and returns a URL to guide the user through the onboarding process, courtesy of Stripe.
async function createStripeAccount(){
    console.log('bank / createStripeAccount() is invoked')
    try {
        const created_account = await stripe_API.accounts.create({
            // All accounts to be created are express accounts (can be changed if needed)
            type: 'express',
            country: 'PH',
            //Enabling fund transfers to created account
            capabilities: {
              transfers: {
                requested: true,
              },
            }, 
            // Added terms of service field for PH users to be registered in Stripe
            tos_acceptance: {
                service_agreement: 'recipient',
              }, 
        })
        
        // Creates an account link for the user, returns a url that has a form that requests user details
        const accountLink = await stripe_API.accountLinks.create({
            account: created_account.id,
            //url is not yet final
            refresh_url: `https://localhost:3000/api/account-creation-reauth/${created_account.id}`,
            return_url: 'https://localhost:3000/api/account-return',
            type: 'account_onboarding',
        });


        return {
            success: true, 
            data: {created_account: created_account.id, onboarding_url: accountLink.url},
            message:[`Stripe account successfully created with acct id: ${created_account.id}. Onboarding link returned.`]
            }

    } catch (err) {
        return {
        success: false,
        data: null,
        message: [`An error occurred while creating a Stripe account: ${err.message}`]
        }
    }
}



async function getAllStripeAccounts(){
    console.log('bank / getAllStripeAccounts() is invoked')
    try {
        let accounts_list = []
        for await(const account of stripe_API.accounts.list()){
            accounts_list.push({id: account.id, email : account.email, business_type: account.business_type})
        }
        return {
            success: true, 
            data: accounts_list, 
            message:[`Successfully retrieved ${accounts_list.length} accounts`]
            }
    } catch (err) {
        return{
            success: false,
            data: null,
            message:[`Error in retrieving Stripe accounts. ${err.message}`]
        }
    }
}





// payload contains account ID and credentials object to be updated
// Subject to change if we want to use a Stripe hosted page to fill out user details to be updated
async function updateStripeAccount(payload){
    console.log('bank / updateStripeAccount() is invoked')
    try {
        const updated_stripeAccount = await stripe_API.accounts.update(
            payload.accountID,
            payload.credentials
        )
        return {
            success: true, 
            data: updated_stripeAccount, 
            message:[`Stripe account with id: ${payload.accountID} successfully updated`]
            }
    } catch (err) {
        return {
            success: false,
            data: null,
            message: [`An error occurred while updating Stripe account: ${err.message}`]
            }
    }
}



// get id by account.id
async function getStripeAccount(account){
    console.log('bank / getStripeAccount() is invoked')
    try {
        const existing_account = await stripe_API.accounts.retrieve(account.id)
        return { 
            success : true,
            data: existing_account,
            message : [`Successfully retrieved account with id ${existing_account.id}`]
        }
    } catch (err) {
        return { 
            success: false,
            data: null,
            message : [`Error in getting Stripe account. ${err.message}`]
        }
    }
}



// Get id by account.id
async function deleteStripeAccount(account){
    console.log('bank / deleteStripeAccount() is invoked')
    try {
        const deleted_account = await stripe_API.accounts.del(account.id)
        return {
            success: false,
            data: deleted_account,
            message: [`Successfully deleted account with id: ${deleted_account.id}`]
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            message : [`Error in deleting Stripe account. ${err.message}`]
        }
    }

}



async function accountCreationReauth(accountID){
    console.log('bank / accountCreationReauth() is invoked')
    try {
        // Creates an account link for the user, returns a url that has a form that requests user details
        const accountLink = await stripe_API.accountLinks.create({
            account: accountID,
            //url is not yet final, subject to change after testing in local environment
            refresh_url: `https://localhost:3000/api/account-creation-reauth/${accountID}`,
            return_url: 'https://localhost:3000/api/account-return',
            type: 'account_onboarding',
        });

        // Redirect user to new account link url
        return {
            success: true, 
            data: {accountID: accountID, onboarding_url: accountLink.url},
            message:[`Account creation reauthentication invoked. Onboarding link returned.`]
        }

    } catch (err) {
        return {
        success: false,
        data: null,
        message: [`An error occurred while reauthenticating onboarding link: ${err.message}`]
        }
    }
}




console.log('bank / account_controller has been imported')
export {
    createStripeAccount,
    getAllStripeAccounts,
    getStripeAccount,
    updateStripeAccount,
    deleteStripeAccount,
    accountCreationReauth
}