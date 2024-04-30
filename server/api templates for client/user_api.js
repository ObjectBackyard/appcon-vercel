



//  CLIENT FETCH TEMPLATES - USER API




//  TRY USING THE SAMPLE BELOW TO GET ALL USERS
//  *** start copying the code here *** 
{   //  TEMPLATE FOR: Getting all users in the database
    //  data expected: a list of cause objects such as [<userObj>, <userObj>, <userObj>, ...]

    const API_ROUTE = 'http://localhost:3000/api/get-all-users'
    const REQUEST_CONFIGURATION = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }




    //  Frontend team can put anything inside this function to perform procedures on successful request
    function successProcedure(json){
        console.log(json.data)
        console.log(json.message)
        console.log("SUCCESSFUL CALL")
        //  Frontend team can update their state variables inside this function 
    }




    //  Perform a different operation on the frontend when the call failed
    function failedProcedure(error){
        console.log(error)
        console.log("THERE WAS AN ERROR")
        //  Frontend team can update their state variables inside this function 
    }




    await fetch(API_ROUTE, REQUEST_CONFIGURATION)
            .then((response) => { if (response.ok) return response.json(); })
            .then(successProcedure)
            .catch(failedProcedure)
}
//  *** copy until this part ***






//  *************************************** GENERAL TEMPLATE ***************************************

//  *** start copying the code here *** 
{   //  TEMPLATE FOR: [What API do you need]
    //  data expected: [Please see the documentation of the respective API in the server]
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = '[INSERT_ROUTE]'
    const REQUEST_CONFIGURATION = {
        method: '[INSERT_TYPE]',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------


    function successProcedure(json){
    }
    function failedProcedure(error){
    }


    await fetch(API_ROUTE, REQUEST_CONFIGURATION)
            .then((response) => { if (response.ok) return response.json(); })
            .then(successProcedure)
            .catch(failedProcedure)
}
//  *** copy until this part ***






//  *************************************** API CONFIGURATIONS FOR USE ***************************************

{   //  TEMPLATE FOR: account creation
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/create-account'
    const REQUEST_CONFIGURATION = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}




{   //  TEMPLATE FOR: log in given the credentials
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/log-in'
    const REQUEST_CONFIGURATION = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}



{   //  TEMPLATE FOR: log out given the User entity as json
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/log-out'
    const REQUEST_CONFIGURATION = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}




{   //  TEMPLATE FOR: edit account given the User entity as json
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/edit-account'
    const REQUEST_CONFIGURATION = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}




{   //  TEMPLATE FOR: get the user given the User entity as json
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/get-user'
    const REQUEST_CONFIGURATION = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}




{   //  TEMPLATE FOR: delete a user given the User entity as json
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/delete-user'
    const REQUEST_CONFIGURATION = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}




{   //  TEMPLATE FOR: search user given a search string
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/search-user'
    const SEARCH_STRING = "[SEARCH_STRING]" // TODO: san to ilalagay
    const REQUEST_CONFIGURATION = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}