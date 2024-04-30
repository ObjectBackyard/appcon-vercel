



//  CLIENT FETCH TEMPLATES - MODERATOR API




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