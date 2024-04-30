// This is for when accessing the env variable outside of the
// blockchain directory in the final repository

import { config as dotenvConfig } from 'dotenv';
import { JsonRpcProvider, Wallet, Contract, ContractFactory, Interface } from "ethers";
import pkg from "fs-extra";
import path from "path";
const { readFileSync } = pkg;

// ****************************************************** //
// This section is for laoding the env variables.
// ****************************************************** //

// Load environment variables from the .env file
dotenvConfig({ path: "../.env" });

// Now you can access environment variables defined in the .env file
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ABI = process.env.ABI_ADDRESS;
const BIN = process.env.BIN_ADDRESS;
const CONTRACT_TARGET = process.env.CONTRACT_TARGET;

// ****************************************************** //
// End of load env variables.
// ****************************************************** //

// ****************************************************** //
// This part is for setting up the 3 main objects to be
// used for the project.
// ****************************************************** //


// Setting up the credentials
const PROVIDER = new JsonRpcProvider(RPC_URL);
// let abiPath = path.join(process.cwd(), '_Storage_sol_Storage.abi');
// let abi = readFileSync(abiPath, "utf-8");
// let binPath = path.join(process.cwd(), '_Storage_sol_Storage.bin');
// let bin = readFileSync(binPath, "utf-8");

// const abi = readFileSync("./_Storage_sol_Storage.abi", "utf8")
// const binary = readFileSync("./_Storage_sol_Storage.bin","utf8")

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"string","name":"_amount","type":"string"},{"internalType":"string","name":"_sender_name","type":"string"},{"internalType":"string","name":"_stripe_destination_acc","type":"string"},{"internalType":"string","name":"_database_user_id","type":"string"},{"internalType":"string","name":"_database_transaction_id","type":"string"}],"name":"addRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRecord","outputs":[{"components":[{"internalType":"string","name":"amount","type":"string"},{"internalType":"string","name":"sender_name","type":"string"},{"internalType":"string","name":"stripe_destination_acc","type":"string"},{"internalType":"string","name":"database_user_id","type":"string"},{"internalType":"string","name":"database_transaction_id","type":"string"}],"internalType":"struct Storage.Transaction","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"records","outputs":[{"internalType":"string","name":"amount","type":"string"},{"internalType":"string","name":"sender_name","type":"string"},{"internalType":"string","name":"stripe_destination_acc","type":"string"},{"internalType":"string","name":"database_user_id","type":"string"},{"internalType":"string","name":"database_transaction_id","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const binary = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061111a806100606000396000f3fe6080604052600436106100435760003560e01c806303e9e609146100be5780632d1814f2146100fb57806334461067146101245780638da5cb5b1461016557610083565b36610083576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161007a90610dd7565b60405180910390fd5b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100b590610dd7565b60405180910390fd5b3480156100ca57600080fd5b506100e560048036038101906100e09190610ba0565b610190565b6040516100f29190610df7565b60405180910390f35b34801561010757600080fd5b50610122600480360381019061011d9190610a99565b6104a6565b005b34801561013057600080fd5b5061014b60048036038101906101469190610ba0565b610630565b60405161015c959493929190610d41565b60405180910390f35b34801561017157600080fd5b5061017a61091e565b6040516101879190610d26565b60405180910390f35b610198610942565b600182815481106101ac576101ab610fac565b5b90600052602060002090600502016040518060a00160405290816000820180546101d590610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461020190610f1a565b801561024e5780601f106102235761010080835404028352916020019161024e565b820191906000526020600020905b81548152906001019060200180831161023157829003601f168201915b5050505050815260200160018201805461026790610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461029390610f1a565b80156102e05780601f106102b5576101008083540402835291602001916102e0565b820191906000526020600020905b8154815290600101906020018083116102c357829003601f168201915b505050505081526020016002820180546102f990610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461032590610f1a565b80156103725780601f1061034757610100808354040283529160200191610372565b820191906000526020600020905b81548152906001019060200180831161035557829003601f168201915b5050505050815260200160038201805461038b90610f1a565b80601f01602080910402602001604051908101604052809291908181526020018280546103b790610f1a565b80156104045780601f106103d957610100808354040283529160200191610404565b820191906000526020600020905b8154815290600101906020018083116103e757829003601f168201915b5050505050815260200160048201805461041d90610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461044990610f1a565b80156104965780601f1061046b57610100808354040283529160200191610496565b820191906000526020600020905b81548152906001019060200180831161047957829003601f168201915b5050505050815250509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610534576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052b90610db7565b60405180910390fd5b61053c610942565b858160000181905250848160200181905250838160400181905250828160600181905250818160800181905250600181908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000190805190602001906105b1929190610971565b5060208201518160010190805190602001906105ce929190610971565b5060408201518160020190805190602001906105eb929190610971565b506060820151816003019080519060200190610608929190610971565b506080820151816004019080519060200190610625929190610971565b505050505050505050565b6001818154811061064057600080fd5b906000526020600020906005020160009150905080600001805461066390610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461068f90610f1a565b80156106dc5780601f106106b1576101008083540402835291602001916106dc565b820191906000526020600020905b8154815290600101906020018083116106bf57829003601f168201915b5050505050908060010180546106f190610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461071d90610f1a565b801561076a5780601f1061073f5761010080835404028352916020019161076a565b820191906000526020600020905b81548152906001019060200180831161074d57829003601f168201915b50505050509080600201805461077f90610f1a565b80601f01602080910402602001604051908101604052809291908181526020018280546107ab90610f1a565b80156107f85780601f106107cd576101008083540402835291602001916107f8565b820191906000526020600020905b8154815290600101906020018083116107db57829003601f168201915b50505050509080600301805461080d90610f1a565b80601f016020809104026020016040519081016040528092919081815260200182805461083990610f1a565b80156108865780601f1061085b57610100808354040283529160200191610886565b820191906000526020600020905b81548152906001019060200180831161086957829003601f168201915b50505050509080600401805461089b90610f1a565b80601f01602080910402602001604051908101604052809291908181526020018280546108c790610f1a565b80156109145780601f106108e957610100808354040283529160200191610914565b820191906000526020600020905b8154815290600101906020018083116108f757829003601f168201915b5050505050905085565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040518060a0016040528060608152602001606081526020016060815260200160608152602001606081525090565b82805461097d90610f1a565b90600052602060002090601f01602090048101928261099f57600085556109e6565b82601f106109b857805160ff19168380011785556109e6565b828001600101855582156109e6579182015b828111156109e55782518255916020019190600101906109ca565b5b5090506109f391906109f7565b5090565b5b80821115610a105760008160009055506001016109f8565b5090565b6000610a27610a2284610e3e565b610e19565b905082815260208101848484011115610a4357610a4261100f565b5b610a4e848285610ed8565b509392505050565b600082601f830112610a6b57610a6a61100a565b5b8135610a7b848260208601610a14565b91505092915050565b600081359050610a93816110cd565b92915050565b600080600080600060a08688031215610ab557610ab4611019565b5b600086013567ffffffffffffffff811115610ad357610ad2611014565b5b610adf88828901610a56565b955050602086013567ffffffffffffffff811115610b0057610aff611014565b5b610b0c88828901610a56565b945050604086013567ffffffffffffffff811115610b2d57610b2c611014565b5b610b3988828901610a56565b935050606086013567ffffffffffffffff811115610b5a57610b59611014565b5b610b6688828901610a56565b925050608086013567ffffffffffffffff811115610b8757610b86611014565b5b610b9388828901610a56565b9150509295509295909350565b600060208284031215610bb657610bb5611019565b5b6000610bc484828501610a84565b91505092915050565b610bd681610e9c565b82525050565b6000610be782610e6f565b610bf18185610e7a565b9350610c01818560208601610ee7565b610c0a8161101e565b840191505092915050565b6000610c2082610e6f565b610c2a8185610e8b565b9350610c3a818560208601610ee7565b610c438161101e565b840191505092915050565b6000610c5b602583610e8b565b9150610c668261102f565b604082019050919050565b6000610c7e603983610e8b565b9150610c898261107e565b604082019050919050565b600060a0830160008301518482036000860152610cb18282610bdc565b91505060208301518482036020860152610ccb8282610bdc565b91505060408301518482036040860152610ce58282610bdc565b91505060608301518482036060860152610cff8282610bdc565b91505060808301518482036080860152610d198282610bdc565b9150508091505092915050565b6000602082019050610d3b6000830184610bcd565b92915050565b600060a0820190508181036000830152610d5b8188610c15565b90508181036020830152610d6f8187610c15565b90508181036040830152610d838186610c15565b90508181036060830152610d978185610c15565b90508181036080830152610dab8184610c15565b90509695505050505050565b60006020820190508181036000830152610dd081610c4e565b9050919050565b60006020820190508181036000830152610df081610c71565b9050919050565b60006020820190508181036000830152610e118184610c94565b905092915050565b6000610e23610e34565b9050610e2f8282610f4c565b919050565b6000604051905090565b600067ffffffffffffffff821115610e5957610e58610fdb565b5b610e628261101e565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610ea782610eae565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610f05578082015181840152602081019050610eea565b83811115610f14576000848401525b50505050565b60006002820490506001821680610f3257607f821691505b60208210811415610f4657610f45610f7d565b5b50919050565b610f558261101e565b810181811067ffffffffffffffff82111715610f7457610f73610fdb565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e60008201527f6374696f6e000000000000000000000000000000000000000000000000000000602082015250565b7f4f6e6c7920746865206f776e657220697320616c6c6f77656420746f20696e7460008201527f65726163742077697468207468697320636f6e74726163742e00000000000000602082015250565b6110d681610ece565b81146110e157600080fd5b5056fea264697066735822122009123b9f0832797ba826aa30108076535904d8bd80fd3fbe5ccecbe6a2c01 ";
const WALLET = new Wallet(PRIVATE_KEY, PROVIDER);
const CONTRACT = new Contract(CONTRACT_TARGET, abi, WALLET);

// Setting up interfaces
const INTERFACE = new Interface(abi);

// ****************************************************** //
// End object setup.
// ****************************************************** //


// ****************************************************** //
// This section is for the colored logging.
// ****************************************************** //
const COLORS = {
    "reset": "\x1b[0m",
    "red": "\x1b[31m",
    "green": "\x1b[32m",
    "yellow": "\x1b[33m",
};


/*
    Name: coloredLog()
    Parameters:
        String color
        String text
    Returns: n/a
    Description:
        Cosmetic function. Adds color to the logs in the terminal.
    Notes:
        Can be removed if it is affecting performance.
        Transfer later on to the utility module.
*/
function coloredLog(color, text) {
    console.log(COLORS[color] + text + COLORS["reset"])
}
// ****************************************************** //
// End of colored logging.
// ****************************************************** //




export{
    RPC_URL,
    PRIVATE_KEY,
    ABI,
    BIN,
    CONTRACT_TARGET,
    PROVIDER,
    WALLET,
    CONTRACT,
    INTERFACE,
    coloredLog
}

// reset april 27