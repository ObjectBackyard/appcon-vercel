



import {
    blacklistAccount,
    removeCause
} from '../data/moderator_controller.js';


//  All API functions here accept an HTTP request
//  ALL API functions send an HTTP response with a JSON with the format {success: <bool>, data: <JSON>, message: <list>}




const blacklistAccountAPI = (req, res) => {

    //  use blacklistAccount from ../data/moderator_controller.js
    const blacklistAccount_result = blacklistAccount(req.body)

    const response = {
        success: blacklistAccount_result.success,
        data: blacklistAccount_result.data,
        message: [...blacklistAccount_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const removeCauseAPI = (req, res) => {

    //  use removeCause, which is from data/moderator_controller.js
    const removeCause_result = removeCause(req.body)

    const response = {
        success: removeCause_result.success,
        data: removeCause_result.data,
        message: [...removeCause_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




export {
    blacklistAccountAPI,
    removeCauseAPI
}