



import Cause from './cause_model.js';
import Transaction from './transaction_model.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

//  PURPOSE OF THIS MODULE:
//      - all functions relating to the Cause entity
//      - Provide functions that will communicate with the database
//      - It makes http requests to the database server and returns the data obtained




//  Feel free to edit the parameters accepted by the functions, as well as the return data




async function getAllCauses() {
    console.log("data / getAllCauses() is invoked");
    try{
        const data = await Cause.find();
        return {success: true, data: data, message: []};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message: ['An error occurred while fetching causes.']};
    }
}
//  getAllCauses() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




async function fuzzySearchCauses(search_string) {
    console.log("data / fuzzySearchCauses() is invoked");

    try {
        const data = await Cause.aggregate([
            {
                $search: {
                    index: "naturalSearchCause",
                    text: {
                        query: search_string,
                        path: {
                            wildcard: "*"
                        },
                        fuzzy: {}
                    }
                }
            }
        ]);

        return { success: true, data: data, message: [] };
    } catch (err) {
        console.log('error: ', err);
        return { success: false, data: null, message: ['An error occurred while performing fuzzy search.'] };
    }
}





// Added getCause function, searches for Cause id in database
async function getCause(cause_id){
    console.log("data / getCause() is invoked");

    if(!ObjectId.isValid(cause_id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const cause =  await Cause.findById(cause_id);
        if(cause) return {success: true, data: cause, message:[]};
        return {success: false, data: null, message:['There is no Cause with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while fetching a Cause']};
    }
}






//  This deconstruction serves as a safeguard to ensure that the object we pass as parameter is correct
async function createCause({user_id, post_content, goal_amount,title, date_created, urgency, type, images}){
    console.log("data / createCause() is invoked")
    try{
        const created_cause = await Cause.create({user_id,goal_amount,title, post_content, date_created, urgency, type, images});
        //  Niko: tama to! pa-conform lang if ung magiging value ng created_cause is the actual Cause object from the database?
        return {success: true, data: created_cause, message:[]};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while creating a cause']};
    }
}
//  createCause() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




async function getCausesByUser(userId){
    console.log("data / getCausesByUser() is invoked")
    if(!ObjectId.isValid(userId)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const causes_by_user =  await Cause.find({user_id: userId});
        return {success: true, data: causes_by_user, message:[]};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while fetching causes']};
    }
}
//  getCausesByUser() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




//  get the vause by cause.id
//  the passed cause parameter contains the updated values
async function updateCause(cause){
    console.log("data / updateCause() is invoked")
    if(!ObjectId.isValid(cause.id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const updated_cause =  await Cause.findByIdAndUpdate(cause.id, cause, {new: true});
        if(updated_cause) return {success: true, data: updated_cause, message:[]};
        return {success: false, data: null, message:['There is no Cause with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while updating a cause']};
    }
}
//  updateCause() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




async function deleteCause(cause){
    console.log("data / deleteCause() is invoked")
    if(!ObjectId.isValid(cause.id)) return {success: false, data: null, message:['The given ID is invalid']};
    try{
        const deleted_cause =  await Cause.findByIdAndDelete(cause.id);
        if(deleted_cause) return {success: true, data: deleted_cause, message:[]};
        return {success: false, data: null, message:['There is no Cause with the given ID']};
    }catch (err){
        console.log('error: ', err);
        return {success: false, data: null, message:['An error occured while deleting a cause']};
    }
}
//  deleteCause() REVIEWED BY:
//  - Niko [Wed Jan 3 13:13:11 2024]




//  searchCause() accepts a search string like what you type on YouTube
//  Preprocesses the search result according to an algorithm, like what the YouTube search algorithm does (for now basic lang muna)
//  Returns a list of Cause objects like what happens when you search on YouTube, you get a list of videos
//  NOTE: because of the complexity of this function, it may be designated to its own separate module soon
function searchCause(search_string){
    console.log("data / searchCause() is invoked")
    const data = []
    return {success: true, data: data, message: []}
}




//  searchCauseByUser() accepts a search string like what you type on YouTube, and the user id of the respective user
//  Preprocesses the search result according to an algorithm, like what the YouTube search algorithm does (for now basic lang muna)
//  Returns a list of Cause objects like what happens when when you search for videos inside a channel, you get a list of videos
//  NOTE: because of the complexity of this function, it may be designated to its own separate module soon
function searchCauseByUser(searchCause, userId){
    console.log("data / searchCauseByUser() is invoked")
    const data = []
    return {success: true, data: data, message: []}
}




//  sortCauses() 
//  input:
//      - causes        | a list of cause objects.
//      - key           | a string. cause objects are json objects that have keys, the question is we sort the causes according to what key? date? urgency? etc.
//      - isAscending   | boolean
//  
//  output: list of cause objects in the data field like [<json>, <json>, <json>]
//  
function sortCauses(causes, key, isAscending){
    console.log("data / sortCauses() is invoked")
    const data = []
    return {success: true, data: data, message: []}
}


async function getTotalAmountOfCause(cause_ID) {
    console.log("data / getTotalAmountOfCause() is invoked");
    // console.log(cause_ID);

    if(!ObjectId.isValid(cause_ID)) { 
        return {
            success: false, 
            data: null, 
            message:['The given cause_id is invalid']
        };
    }

    try {
        const result = await Transaction.aggregate([
            {$match: { cause_id: cause_ID }},
            {$group: {
                _id: cause_ID,
                totalAmountPaid: { $sum: '$amount_paid' }
            }
            }
        ]);

        console.log(result);

        let total = result.length > 0 ? result[0].totalAmountPaid : 0;
        
        let success_response = {
            success: true,
            data: total,
            message: ["Successfully summed up donation received by cause."]
        }
        return (success_response);

    } catch (err) {
        console.log(err);
        let failure_response = {
            success: false,
            data: err,
            message: ["Failed to get total amount donated.", err]
        }
        return (failure_response);
    }
}



// EXPORTING ALL THE FUNCTIONS CREATED
console.log("data / cause_controller.js has been imported")
export {
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
}