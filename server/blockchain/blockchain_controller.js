import { PROVIDER, CONTRACT, INTERFACE, CONTRACT_TARGET, coloredLog } from "./utility_blockchain.js";
import { JsonRpcProvider, Wallet, Contract, ContractFactory, Interface } from "ethers";
import pkg from "fs-extra";
const { readFileSync } = pkg;

console.log("blockchain / blockchain_controller.js has been imported");

/*
    Name: setupCredentials()
    Parameters:
        Address contactAddress
    Returns:
        Contract contract
    Description:
        Sets up the necessary details for each blockchain function
        call.
    Notes:
*/
function setupCredentials() { // can turn this into a structure later that would be passed along
    let provider = new JsonRpcProvider(RPC_URL)
    let wallet = new Wallet(PRIVATE_KEY, provider)

    const abi = readFileSync(ABI_FILE, "utf8")
    const binary = readFileSync(BIN_FILE,"utf8")
    let contract = new Contract(CONTRACT_ADDRESS, abi, wallet)

    return contract;
}




/*
    Name: addRecord()
    Parameters:
        Transaction json
        Address contractAddress
    Returns:
        Transaction response confirmation
    Description:
        Writes a record onto the array in the blockchain contract.
        Uses the setupCredentials() function to allow the program
        to write.
        The specific transaction hash for each transaction object
        would be obtained from here.
        This function would not work if it was invoked by other
        accounts.
    Notes:
    To-do:
*/ 
async function addRecord(request) {
    let {amount_paid, source_id, destination_id, cause_id} = request;
    let sender_name = "Temporary user";
    coloredLog("yellow", "Adding a record, please wait...")
    // console.log({ amount, sender_name, stripe_destination_acc, database_user_id, database_transaction_id });
    
    try {
        // The transaction response here contains the entire details
        // of the transaction that happened on the contract.
        // This includes the contract involved, the sender account,
        // the transaction hash, the transaction has input
        let add_transaction_response = await CONTRACT.addRecord(
            `${amount_paid}`, sender_name, destination_id,
            source_id, cause_id);

        // Waits for the transaction response to be completed before
        // exiting the function.
        let add_transaction_receipt = await add_transaction_response.wait();
        coloredLog("green", "Successfully added a record.")

        let success_message = {
            success:true,
            data:{ hash:add_transaction_receipt.hash },
            message: ["Transaction added successfully."]
        }
        
        // console.log(success_message);
        return (success_message);

    } catch (err) {
        console.log(err);
        coloredLog("red", "There was an error with adding a record.")
        
        let failure_message = {
            success:false,
            data: err, // returns the error log, this can be a huge object
            message: ["Failed to record transaction."]
        }
        // console.log(failure_message);
        return (failure_message);
    }
}




/*
    Name: readRecord()
    Parameters:
        int index
        Address contractAddress
    Returns:
        Transaction json
    Description:
        Reads the transaction details stored at the corresponding
        index.
    Notes:
        For this implementation, the index on the blockchain would
        have to be stored on the database for quick lookup.
        This is now obsolete for local access with the implementation 
        of readRecordByHash().
    To-do:
*/
async function readRecord(index) {
    // let contract = setupCredentials();

    coloredLog("yellow","Reading contract please wait...")

    try {
        let record = await CONTRACT.getRecord(index);
        return({success: true, data:{record}, message:null});
    } catch (err) {
        if (err.reason.includes('Panic due to ARRAY_RANGE_ERROR')) {
            coloredLog("red", "ERROR: The index you are accessing is out of bounds.")
            return({success: false, data:null, message:["Index out of bounds."]})
        }
    }
}




/*
    Name: readRecordByHash()
    Parameters:
        String transaction_hash
    Returns:
        Transaction json
    Description:
        Reads the transaction details by using the transaction
        hash and reading the input data for that transaction.
    Notes:
    To-do:
*/
async function readRecordByHash({transaction_hash}) {

    // let transaction_hash = req.transaction_hash;
    console.log(`Read record by has has been called with the hash: ${transaction_hash}.`);
    
    
    let failure_message = {
        success:false,
        data: null,
        message: ["Transaction not found. Incorrect hash and/or network."]
    }

    // There is no need to setup credentials since we are just
    // reading information publicly available on the blockchain.
    
    try {
        // Get transaction details
        const tx = await PROVIDER.getTransaction(transaction_hash);
        // console.log(tx);

        // Check if transaction exists
        if (!tx.data) {
            return(failure_message);
        }


        // Parse input data
        let input_data = tx.data;


        let decoded = INTERFACE.parseTransaction( { data: input_data })
        


        let success_message = {
            success:true,
            data:{ 
                amount:decoded.args[0],
                sender_name:decoded.args[1],
                stripe_destination_acc:decoded.args[2],
                database_user_id:decoded.args[3],
                database_transaction_id:decoded.args[4]
            },
            message: ["Transaction added successfully."]
        }


        return(success_message);
    } catch (error) {
        return(failure_message);
    }
}



export{
    setupCredentials,
    addRecord,
    readRecord,
    readRecordByHash
}