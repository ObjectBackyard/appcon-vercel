



import {
    accountCreationReauth,
    createStripeAccount, 
    deleteStripeAccount, 
    getAllStripeAccounts, 
    getStripeAccount, 
    updateStripeAccount
} from '../bank/account_controller.js'





const createStripeAccountAPI = async (req,res) =>{

    const createStripeAccount_result = await createStripeAccount()
    const response = {
        success: createStripeAccount_result.success,
        data: createStripeAccount_result.data,
        message : createStripeAccount_result.message
    }

    res.send(response)
}




const getAllStripeAccountsAPI = async (req,res) =>{
    const getAllStripeAccounts_result = await getAllStripeAccounts()

    const response = {
        success: getAllStripeAccounts_result.success,
        data: getAllStripeAccounts_result.data,
        message: getAllStripeAccounts_result.message
    }

    res.send(response)
}



const getStripeAccountAPI = async (req,res) =>{

    const getStripeAccount_result = await getStripeAccount(req.body)

    const response = {
        success: getStripeAccount_result.success,
        data: getStripeAccount_result.data,
        message: getStripeAccount_result.message
    }

    res.send(response)
}




const updateStripeAccountAPI = async (req,res) =>{

    const updateStripeAccount_result = await updateStripeAccount(req.body)

    const response = {
        success: updateStripeAccount_result.success,
        data: updateStripeAccount_result.data,
        message: updateStripeAccount_result.message
    }

    res.send(response)
}



const deleteStripeAccountAPI = async (req,res) =>{

    const deleteStripeAccount_result = await deleteStripeAccount(req.body)

    const response = {
        success: deleteStripeAccount_result.success,
        data: deleteStripeAccount_result.data,
        message: deleteStripeAccount_result.message
    }

    res.send(response)
}




const accountCreationReauthAPI = async(req,res) =>{

    const accountID = req.params.accountID
    const accountCreationReauth_result = await accountCreationReauth(accountID)

    // Redirect user to new onboarding url using data.onboarding_url
    const response = {
        success: accountCreationReauth_result.success,
        data: accountCreationReauth_result.data,
        message: accountCreationReauth_result.message
    }

    res.send(response)
}





export{
    createStripeAccountAPI,
    getAllStripeAccountsAPI,
    getStripeAccountAPI,
    updateStripeAccountAPI,
    deleteStripeAccountAPI,
    accountCreationReauthAPI
}