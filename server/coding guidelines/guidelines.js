

/*

==========================================================================================================================================

GUIDELINES (Version 1.0)

- NAMING CONVENTION
- MODULARIZATION
- VARIABLE USE
- CODE WRITING
- NETWORK COMMUNICATION




Last updated Dec 29, 2023 by Nikolas Alcala

==========================================================================================================================================






************************************************************ NAMING CONVENTION ************************************************************


Classes - Pascal                |   DonationPost
Functions - Camel               |   createPost
Variables - Snek                |   variable_1, my_name

Constants - Snek UPPER CASE     |   DEFAULT_VALUE

*/




/*

************************************************************ MODULARIZATION ************************************************************


what is a module?
-   1 .js file = 1 module
-   Each module should only serve 1 purpose or reason.


How should we group processes/functions into modules?
-   Imagine each module to be a body part. Although the hand is part of the arm, it should be in a separate module because it is used for grip, while the rest of the arm is used for motion.
-   A module may consist of several functions provided that the functions are completely related with the module.
-   Similarly, the functions of the hand are the fingers since they are completely related.


The utility modules
-   Sometimes, we may assume that some functions may be used everywhere (like a date generator) hence we create modules called utility modules to put all of them there, and just import them when used
-   Kayo na bahala sa naming ng utility module basta naandon ung "utility" sa file name
*/






//************************************************************ VARIABLE USE ************************************************************


//  -------------------- VARIABLE USE: NAMED PROCEDURES -------------------- [ IMPORTANT ]

//  PROBLEM: It becomes hard to make sense of code when there are too many nestings of procedures and calls. So we dissect the chunks
//  Variables are not just used to store values, they can also be used to name procedures in code if you call it that way. See example below


//  Instead of

mongoose.connect("mongodb+srv://embautista4:WKoRfkzpzutyp023@cluster0.sheejmn.mongodb.net/object_db?retryWrites=true&w=majority")
  .then(
    () => { console.log("The bluetooth device is connected dah succesfalley"); }
    )
  .catch(
    (error) => { console.error('Failed to connect to MongoDB:', error); }
    );

  //  That one above is completely identical in logic with this single line:
  mongoose.connect("mongodb+srv://embautista4:WKoRfkzpzutyp023@cluster0.sheejmn.mongodb.net/object_db?retryWrites=true&w=majority").then( () => { console.log("The bluetooth device is connected dah succesfalley"); } ).catch( (error) => { console.error('Failed to connect to MongoDB:', error); } );
  //  IT'S LIKE SAYING: Yung nag-iisang kapatid ng tita ng nagbigay ng regalo kay Maria ay binigay yung regalo sa anak ng tito ng nanay ng kapatid ni Maria?




//  Consider

function mongoose_success_callback(){ console.log("The bluetooth device is connected dah succesfalley"); }
function mongoose_failed_callback(error){ console.error('Failed to connect to MongoDB:', error); }
const DATABASE_URI = "mongodb+srv://embautista4:WKoRfkzpzutyp023@cluster0.sheejmn.mongodb.net/object_db?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URI)
  .then(mongoose_success_callback)
  .catch(mongoose_failed_callback);
    //  ang nag-iisang kapatid ng tita ng nag regalo kay maria ay magulang nung nagbigay ng regalo kay Maria
    //  ang anak ng tito ng nanay ng kapatid ni Maria ay tito/tita ni Maria
    //  => Yung magulang nung nagbigay ng regalo kay Maria ang binigay yung regalo sa tito/tita ni Maria




//  WARNING: not all codeblocks can be reformatted this way, example below
//  Reason: the parameter "res" is used in the nested promise callback in .then(). There's no way to refactor the code to look like the previous example.
const getAllCauses = (req, res) => {
  Cause.find().then((data) => {
      res.send(data);
  }).catch((err) => {
      console.log('error: ', err);
  });
}






//************************************************************ CODE WRITING ************************************************************


//  -------------------- CODE WRITING: NESTING --------------------

//  LIMIT nesting, try using two independent loops instead of nested loops whenever possible
//  ganon din sa conditionals






//  -------------------- CODE WRITING: READABILITY  01 (naming) --------------------

//  Don't shorten variable names
//  Don't use acronyms unless we're more familiar with the acronym than the spelled out, examples are URL, and UML

//  Instead of
var who
var new_val

//  Consider
var world_health_organization
var new_value




//  -------------------- CODE WRITING: READABILITY  02 (line spacing) --------------------

//  Group related lines in a single code block
//  Blocks of code should ALWAYS be separted by 6 or 4 lines whichever makes sense, except for the beginning of function definitions (1 line lang)
//  Use 2 or 1 line separation in whatever way that's comfy to you
//  Example: some code blocks are related so separating them by 4 lines don't seem proper, just 2 makes sense




//  -------------------- CODE WRITING: READABILITY  03 (indentation) -------------------- [ IMPORTANT ]

//  indent 4 spaces for entire statements, 2 spaces for other use cases of indentations (Example yung mongoose.connect sa variable use sa earlier code)
//  AVOID varying indentations: always use a consistent indentation level, preferrably 0 or just 1 level
//  AVOID curly braces whenever possible
//  This means refactoring your code, especially on conditionals to avoid these


//  ALWAYS return early from a function when possible, hence unahin mo sa code yung magpapareturn
//  >>> This also improves speed


//  Instead of 
if(!condition_A){
    if(condition_B &&  condition_C){
        console.log("Hi")
    }
    else if(condition_B &&  condition_D){
        return
    }
    console.log("Finally")
}
else{
    return
}





//  Consider (notice how condition_C was completely omitted)

if(condition_A) return
if(condition_B){
    if (condition_D) return
    console.log("Hi")
    console.log("Finally")
}






//************************************************************ NETWORK COMMUNICATION ************************************************************

//  -------------------- NETWORK COMMUNICATION: JSON standard --------------------

//  This involves procedures with http messages
//  Always return a JSON object with these three properties {success: <bool>, data: <JSON>, message: <list>}
//  Examples:
//      -   {success: false, data: null, message: ["Failed to connect to the database"]}
//      -   {success: true, data: 12, message: []}
//      -   {success: true, data: {key: "something", value: "something"}, message: []}






/*
==========================================================================================================================================

                                                                VERSIONS

    Version number      Date isssued        Author(s)                                   Key revisions

    1.0                 Dec 29, 2023        Nikolas Alcala                              - Initial guidelines
..........................................................................................................................................


==========================================================================================================================================
*/