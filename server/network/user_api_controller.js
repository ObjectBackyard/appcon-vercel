



import {
    getAllUsers,
    createAccount,
    logIn,
    logOut,
    editAccount,
    getUser,
    deleteUser,
    searchUser,
    getUserTransactionStatistics
} from '../data/user_controller.js';
import { createSecretToken } from '../data/utility.js';

//  All API functions here accept an HTTP request
//  ALL API functions send an HTTP response with a JSON with the format {success: <bool>, data: <JSON>, message: <list>}




//  IMPORTANT: Please follow this simple example for simple API functions
//  Basic API function that does only one thing, communicate with the database
const getAllUsersAPI = async (req, res) => {

    const getAllUsers_result = await getAllUsers()
    const response = {
        success: getAllUsers_result.success,
        data: getAllUsers_result.data,
        message: [...getAllUsers_result.message],
    }
    res.send(response)
}




//  IMPORTANT: Please follow this example for more expressive API functions
//  Other API functions may need to communicate with external services or servers
const getAllCausesAdvancedAPI = (req, res) => {

    const getAllUsers_result = getAllUsers()


    //  Insert function call to the controllers of other services (the functions should be found in another module)
    //  Example: calls to Google API (which is another server)
    //  Communication with the Google API should have their own controller functions, which will be imported here


    const response = {
        success: getAllUsers_result.success,
        data: getAllUsers_result.data,
        message: [...getAllUsers_result.message],
    }
    res.send(response)
}




const createAccountAPI = async (req, res) => {
    //  use createAccount, which is from data/user_controller.js
    const createAccount_result = await createAccount(req.body);

    const response = {
        success: createAccount_result.success,
        data: createAccount_result.data,
        message: [...createAccount_result.message],
    }
    res.send(response)
}




const logInAPI = async (req, res) => {
    //  use logIn, which is from data/user_controller.js
    const logIn_result = await logIn({email:req.body.email, password:req.body.password});
    if(logIn_result.success){
        const token = logIn_result.data;
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
            secure: false,
            path:'/'
        });
        res.status(201).json(logIn_result)
    }else{
        const response = {
            success: false,
            data: null,
            message: ['Login Failed'],
        }
        res.send(response)
    }
}




const logOutAPI = (req, res) => {
    //  use logOut, which is from data/user_controller.js
    res.cookie("token", "deleted", {
        withCredentials: true,
        httpOnly: false,
    });
    const response = {
        success: true,
        data: null,
        message: [],
    }
    res.send(response)
}




const editAccountAPI = async (req, res) => {
    //  use editAccount, which is from data/user_controller.js
    const editAccount_result = await editAccount(req.body);
    
    const response = {
        success: editAccount_result.success,
        data: editAccount_result.data,
        message: [...editAccount_result.message],
    }
    res.send(response)
}




const getUserAPI = async (req, res) => {
    //  use getUser, which is from data/user_controller.js
    const getUser_result = await getUser(req.body.id);

    const response = {
        success: getUser_result.success,
        data: getUser_result.data,
        message: [...getUser_result.message],
    }
    res.send(response)
}




const deleteUserAPI = async (req, res) => {
    //  use deleteUser, which is from data/user_controller.js
    const deleteUser_result = await deleteUser(req.body)
    const response = {
        success: deleteUser_result.success,
        data: deleteUser_result.data,
        message: [...deleteUser_result.message],
    }
    res.send(response)
}




const searchUserAPI = (req, res) => {
    //  use searchUser, which is from data/user_controller.js
    const response = {
        success: true,
        data: null,
        message: [],
    }
    res.send(response)
}



const getUserTransactionStatisticsAPI = async (req,res) => {
    const {user_id} = req.query;

    const user_statistics = await getUserTransactionStatistics(user_id);

    res.send(user_statistics);
}


export {
    getAllUsersAPI,
    createAccountAPI,
    logInAPI,
    logOutAPI,
    editAccountAPI,
    getUserAPI,
    deleteUserAPI,
    searchUserAPI,
    getUserTransactionStatisticsAPI
}
