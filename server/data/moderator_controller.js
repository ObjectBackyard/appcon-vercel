



//  the Moderator entity inherits all attributes of User


//  PURPOSE OF THIS MODULE:
//      - all functions exclusive to the Moderator
//      - Provide functions that will communicate with the database
//      - It makes http requests to the database server and returns the data obtained






function blacklistAccount (user){
    console.log("data / blacklistAccount() is invoked")
    const data = null
    return {success: true, data: data, message: []}
}





function removeCause (cause){
    console.log("data / removeCause() is invoked")
    const data = []
    return {success: true, data: data, message: []}
}






// EXPORTING ALL THE FUNCTIONS CREATED
console.log("data / moderator_controller.js has been imported")
export {
    blacklistAccount,
    removeCause
}