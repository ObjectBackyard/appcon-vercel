



//  CLIENT FETCH TEMPLATES - CAUSE API




//  TRY USING THE SAMPLE BELOW TO GET ALL CAUSES
//  *** start copying the code here *** 
{   //  TEMPLATE FOR: Getting all causes in the database
    //  data expected: a list of cause objects such as [<causeObj>, <causeObj>, <causeObj>, ...]


    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = 'http://localhost:3000/api/get-all-causes'
    const REQUEST_CONFIGURATION = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------





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
        console.log("SUCCESSFUL CALL")
    }
    function failedProcedure(error){
        console.log("THERE WAS AN ERROR")
    }


    await fetch(API_ROUTE, REQUEST_CONFIGURATION)
            .then((response) => { if (response.ok) return response.json(); })
            .then(successProcedure)
            .catch(failedProcedure)
}
//  *** copy until this part ***






//  *************************************** API CONFIGURATIONS FOR USE ***************************************

{   //  TEMPLATE FOR: 
    //  data expected: 
    
    //  CONFIGURE YOUR HTTP REQUEST ------------------------------------------------------
    const API_ROUTE = '[INSERT_ROUTE]'
    const REQUEST_CONFIGURATION = {
        method: '[INSERT_TYPE]',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //  END OF CONFIGURATION -------------------------------------------------------------
}