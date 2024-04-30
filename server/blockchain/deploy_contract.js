import { ABI, BIN, RPC_URL, PRIVATE_KEY, coloredLog } from "./utility_blockchain.js";
import { JsonRpcProvider, Wallet, Contract, ContractFactory } from "ethers";
import pkg from "fs-extra";
const { readFileSync } = pkg; // double check if i can change this

/*
    
*/

// const BIN = "./Storage_sol_Storage.bin";
// const ABI = "./Storage_sol_Storage.abi";

const BIN_FILE = `${BIN}`;
const ABI_FILE = `${ABI}`;

/*
    Name: deployContract()
    Parameters: n/a
    Returns: 
    Description:
    Deploys the contract based on the pre-compiled solidity
    contract's ABI and BIN files.
    A functioning blockchain RPC_URL and blockchain account
    address is necessary in the .env file for this to work.
    Notes:
*/
async function deployContract() {
    // The wallet is the specific MetaMask account we are using.
    // The provider is the TestNet to be used.
    coloredLog("yellow", "Loading provider and wallet...")
    let provider = new JsonRpcProvider(RPC_URL)
    let wallet = new Wallet(PRIVATE_KEY, provider)
    coloredLog("green","Loaded provider and wallet.")

    // The ABI is the list of functions and variables in the
    // contract that the program needs to know to interact with
    // it properly.
    // The BIN file is the actual compiled version of the solidity
    // code into a contract.
    coloredLog("yellow","Reading ABI and BIN files...");
    console.log(ABI_FILE, BIN_FILE);
    const app_bin_interface = readFileSync(ABI_FILE, "utf8");
    const binary = readFileSync(BIN_FILE, "utf8");
    coloredLog("green","Loaded ABI and BIN files.")

    // The contractFactory is what 'combines' the BIN and ABI
    // files to be deployed to the blockchain.
    coloredLog("yellow","Setting up contract factory.");
    const contractFactory = new ContractFactory(app_bin_interface, binary, wallet)
    coloredLog("green","Finished setting up contract factory.");

    // The contract variable here is the actual contract object
    // deployed on the blockchain.
    coloredLog("yellow","Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.waitForDeployment();
    coloredLog("green",`Contract deployed to ${contract.target}`)
    return contract;
}

export{
    deployContract
}