import dotenv from 'dotenv'
dotenv.config()




//  MIDDLEWARE to handle sending files of different origin from the server or client
const setCORSHeader = (req, res, next) =>{
    const origin = req.headers.origin;

    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    console.log("\n----------------------------------- CORS ALLOWED -----------------------------------")
    next();

}




//  FUNCTION for the ROOT URI
const root = async (req, res) => {

    const failed_obj = { success: false, error: 'Failed get root.'}
    try{
        //  Insert other procedures here
        const success_obj = { success: true, log: "Hi there"}
        res.json(success_obj);
    } catch(error){
        res.status(500).json(failed_obj);
    }
}




export {
    setCORSHeader,
    root,
};