



import User from './user_model.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import bcrypt from 'bcrypt';
import Transaction from './transaction_model.js';
import Cause from './cause_model.js';
import { createSecretToken } from './utility.js';

//  PURPOSE OF THIS MODULE:
//      - all function relating to the User entity
//      - Provide functions that will communicate with the database
//      - It makes http requests to the database server and returns the data obtained




//  Feel free to edit the parameters accepted by the functions, as well as the return data




async function getAllUsers (){
    console.log("data / getAllUsers() is invoked");
    try{
        const data = await User.find();
        return {success: true, data: data, message: []};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message: ['An error occurred while fetching users.']};
    }
}
//  getAllUsers() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




//  This deconstruction serves as a safeguard to ensure that the object we pass as parameter is correct
async function createAccount (user){
    console.log("data / createAccount() is invoked")
    user.date_created = new Date(user.date_created);
    try{
        const existing_user = await User.findOne({ email: user.email });
        if (existing_user) return {success: false, data: null, message:['User already exists']};
        const created_account = await User.create(user);
        return {success: true, data: created_account, message:[]};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while creating a cause',err]};
    }
}
//  createAccount() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




//  di ako sure, baka need pala mag communicate with the database when logging in with auth
async function logIn ({email, password}){
    console.log("data / logIn() is invoked")

    const user = await User.findOne({ email });
    if(!user) return {success: false, data: null, message:['Incorrect password or email']};
    
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) return res.json({message:'Incorrect password or email' }) 

    // This code block can be placed in the user_api_controller
    // const token = createSecretToken(user._id);
    // console.log(token);
    // res.cookie("token", token, {
    //     withCredentials: true,
    //     httpOnly: false,
    // });

    // res.status(201).json({ message: "User logged in successfully", success: true });
    return {success: true, data: user._id, message: ['User logged in successfully']}
}




//  di ako sure, baka need pala mag communicate with the database when logging out with auth
function logOut (user){
    console.log("data / logOut() is invoked")
    const data = null
    return {success: true, data: data, message: []}
}




//  get the user by user.id 
//  user now contains the updated values
async function editAccount (user){
    console.log("data / editAccount() is invoked")
    if(!ObjectId.isValid(user.id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const updated_user =  await User.findByIdAndUpdate(user.id, user, {new: true});
        if(updated_user) return {success: true, data: updated_user, message:[]};
        return {success: false, data: null, message:['There is no User with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while updating a user']};
    }
}
//  editAccount() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




async function getUser (id){
    console.log("data / getUser() is invoked")
    if(!ObjectId.isValid(id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const user =  await User.findById(id);
        if(user) return {success: true, data: user, message:[]};
        return {success: false, data: null, message:['There is no User with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while fetching a user']};
    }
}
//  editAccount() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




async function deleteUser (user){
    console.log("data / deleteUser() is invoked")
    if(!ObjectId.isValid(user.id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const deleted_user =  await User.findByIdAndDelete(user.id);
        if(deleted_user) return {success: true, data: deleted_user, message:[]};
        return {success: false, data: null, message:['There is no User with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while deleting a user']};
    }
}
//  deleteUser() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




//  searchUser() accepts a search string like what you type on YouTube
//  Preprocesses the search result according to an algorithm, like what the YouTube search algorithm does (for now basic lang muna)
//  Returns a list of User objects like what happens when you search on YouTube, you get a list of videos
//  NOTE: because of the complexity of this function, it may be designated to its own separate module soon
function searchUser (searchString){
    console.log("data / searchUser() is invoked")
    const data = []
    return {success: true, data: data, message: []}
}


async function getUserTransactionStatistics(user_id) {
    console.log("data / getuserTransactionStatistics() has been called");

    if(!ObjectId.isValid(user_id)) { 
        return {
            success: false, 
            data: null, 
            message:['The given user_id is invalid']
        };
    }


    try {
        const sourceTransactions = await Transaction.aggregate([
            { $match: { source_id: user_id } },
            { $group: { _id: null, totalAmount: { $sum: "$amount_paid" } } } 
        ]);

        const destinationTransactions = await Transaction.aggregate([
            { $match: { destination_id: user_id } },
            { $group: { _id: null, totalAmount: { $sum: "$amount_paid" } } } 
        ]);

        const causesCreated = await Cause.countDocuments({ user_id: user_id });
        const causesDonatedTo = await Transaction.countDocuments({ source_id: user_id });

        const sent_total = sourceTransactions.length ? sourceTransactions[0].totalAmount : 0;
        const received_total = destinationTransactions.length ? destinationTransactions[0].totalAmount : 0;

        let success_response = {
            success: true,
            data: { 
                sent: sent_total, received: received_total, 
                causes_created: causesCreated, donated_to: causesDonatedTo 
            },
            message: []
        }

        return (success_response);

    } catch (err) {
        console.log(err);
        let failure_response = {
            success: false,
            data: err,
            message: ["Failed to get user transaction statistics.", err]
        }
        return (failure_response);
    }

}

// EXPORTING ALL THE FUNCTIONS CREATED
console.log("data / user_controller.js has been imported")
export {
    getAllUsers,
    createAccount,
    logIn,
    logOut,
    editAccount,
    getUser,
    deleteUser,
    searchUser,
    getUserTransactionStatistics
}