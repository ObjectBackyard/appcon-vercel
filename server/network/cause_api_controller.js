



import { response } from 'express';
import {
    getAllCauses,
    fuzzySearchCauses,
    createCause,
    getCausesByUser,
    updateCause,
    deleteCause,
    searchCause,
    searchCauseByUser,
    sortCauses,
    getCause,
    getTotalAmountOfCause
} from '../data/cause_controller.js';


//  All API functions here accept an HTTP request
//  ALL API functions send an HTTP response with a JSON with the format {success: <bool>, data: <JSON>, message: <list>}




//  IMPORTANT: Please follow this simple example for simple API functions
//  Basic API function that does only one thing, communicate with the database
const getAllCausesAPI = async (req, res) => {

    const getAllCauses_result = await getAllCauses()
    const response = {
        success: getAllCauses_result.success,
        data: getAllCauses_result.data,
        message: [...getAllCauses_result.message],
    }
    res.send(response)
}





const getCauseAPI = async (req,res) =>{

    // Get cause_id in req.params
    const {cause_id} = req.params

    const getCause_result = await getCause(cause_id)

    const response = {
        success: getCause_result.success,
        data: getCause_result.data,
        message: [...getCause_result.message],
    }
    res.send(response)
}




//  IMPORTANT: Please follow this example for more expressive API functions
//  Other API functions may need to communicate with external services or servers
const getAllCausesAdvancedAPI = (req, res) => {

    const getAllCauses_result = getAllCauses()


    //  Insert function call to the controllers of other services (the functions should be found in another module)
    //  Example: calls to Google API (which is another server)
    //  Communication with the Google API should have their own controller functions, which will be imported here


    const response = {
        success: getAllCauses_result.success,
        data: getAllCauses_result.data,
        message: [...getAllCauses_result.message],
    }
    res.send(response)
}




const fuzzySearchCauseAPI = async (req, res) => {
    const {search_query} = req.body
    console.log(req)
    console.log("search_query:",search_query)
    const searchCause_result = await fuzzySearchCauses(search_query)

    const response = {
        success: searchCause_result.success,
        data: searchCause_result.data,
        message: [...searchCause_result.message],
    }
    res.send(response)
}




const createCauseAPI = async (req, res) => {

    //  use createCause, which is from data/cause_controller.js
    const createCause_result = await createCause(req.body)


    const response = {
        success: createCause_result.success,
        data: createCause_result.data,
        message: [...createCause_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const getCausesByUserAPI = async (req, res) => {
    
    //  Get cause ID from route parameters
    const {user_id} = req.params

    //  use getCausesByUser, which is from data/cause_controller.js
    const getCausesByUser_result = await getCausesByUser(user_id)

    const response = {
        success: getCausesByUser_result.success,
        data: getCausesByUser_result.data,
        message: [...getCausesByUser_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const updateCauseAPI = async (req, res) => {

    //  use updateCause, which is from data/cause_controller.js
    const updateCause_result = await updateCause(req.body)

    const response = {
        success: updateCause_result.success,
        data: updateCause_result.data,
        message: [...updateCause_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const deleteCauseAPI = async (req, res) => {

    //  use deleteCause, which is from data/cause_controller.js
    const deleteCause_result = await deleteCause(req.body)

    const response = {
        success: deleteCause_result.success,
        data: deleteCause_result.data,
        message: [...deleteCause_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const searchCauseAPI = async (req, res) => {

    //  use searchCause, which is from data/cause_controller.js
    const searchCause_result = await searchCause(req.body)

    const response = {
        success: searchCause_result.success,
        data: searchCause_result.data,
        message: [...searchCause_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)

//  NOTES:
//  - This method may soon implement NLP for semantic search. It requires no changes for now.




const searchCauseByUserAPI = async (req, res) => {

    //  Get user ID from route parameters
    const {user_id} = req.params

    //  use searchCauseByUser, which is from data/cause_controller.js
    const searchCauseByUser_result = await searchCauseByUser(user_id)

    const response = {
        success: searchCauseByUser_result.success,
        data: searchCauseByUser_result.data,
        message: [...searchCauseByUser_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)




const sortCausesAPI = async (req, res) => {

    //  Get input for sortCauses function from query
    const {key, is_Ascending} = req.query

    //  Assuming data refers to all Cause objects in a list
    const causes_list = await getAllCauses().data

    //  use sortCauses, which is from data/cause_controller.js
    const sortCauses_result = await sortCauses(causes_list, key, is_Ascending)

    const response = {
        success: sortCauses_result.success,
        data: sortCauses_result.data,
        message: [...sortCauses_result.message],
    }
    res.send(response)
}
//  REVIEWED BY:
//  Nikolas (Tue Jan 2 23:52:16 2024)

//  NOTES:
//  - Goods na ung implementation is kukunin lang ulit sa database ung data kasi it saves the client upload time.
//  - Soon pag meron nang "semantic search" baka ndi lahat ng causes na nasa db need i-sort bale subset lang so sort causes may soon instead call searchCause or searchCauseByUser
//  - It requires no changes for now.

const getTotalAmountAPI = async (req, res) => {
    let { cause_id } = req.query;
    const totalAmount_result = await getTotalAmountOfCause( cause_id );

    const response = totalAmount_result;

    res.send(response);
}


const fuzzySearchCause = async (req, res)=> {
    
}

function fuzzeSearch(search_string, list, field_name){
    
}




export {
    getAllCausesAPI,
    fuzzySearchCauseAPI as fuzzySearchAPI,
    createCauseAPI,
    getCausesByUserAPI,
    updateCauseAPI,
    deleteCauseAPI,
    searchCauseAPI,
    searchCauseByUserAPI,
    sortCausesAPI,
    getCauseAPI,
    getTotalAmountAPI
}