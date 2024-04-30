import { deployContract } from './deploy_contract.js';
import { addRecord, readRecord, readRecordByHash } from './blockchain_controller.js';

let test1 = {
    amount_paid:"1",
    source_id: "Person 1",
    destination_id: "account1",
    cause_id: "transaction1"
}

let test2 = {
    amount:"10",
    sender_name: "Person 2",
    stripe_destination_acc: "account2",
    database_user_id: "user2",
    database_transaction_id: "transaction2"
}

let test3 = {
    amount:"100",
    sender_name: "Person 3",
    stripe_destination_acc: "account3",
    database_user_id: "user3",
    database_transaction_id: "transaction3"
}

let test4 = {
    amount:"1000",
    sender_name: "Person 4",
    stripe_destination_acc: "account4",
    database_user_id: "user4",
    database_transaction_id: "transaction4"
}

// let test5 = {
//     amount_paid:"1000",
//     source_id: "Person 4",
//     stripe_destination_acc: "account4",
//     destination_id: "user4",
//     database_transaction_id: "transaction4"
// }

/*
    Name: main()
    Parameters: n/a
    Returns: n/a
    Description:
        Test function that creates a contract and manipulates
        the blockchain to see if it is working. Would not have to
        be invoked once the addRecord and readRecord features have
        been integrated with the main program.
    Notes:
*/

async function main() {
    // let contract = await deployContract();
    
    // let transaction1 = await addRecord(test1);
    // console.log(transaction1)
    // let transaction2 = await addRecord(test2);
    // let transaction3 = await addRecord(test3);
    // let transaction4 = await addRecord(test4);
    // let transaction5 = await addRecord(test5);


    let result1 = await readRecordByHash({transaction_hash:"0x573fbbb45536cd9efee490ac17c404403ba2c69a184a847763affb1084447094"});
    // let result2 = await readRecordByHash(transaction2.data.hash);
    // let result3 = await readRecordByHash(transaction3.data.hash);
    // let result4 = await readRecordByHash(transaction4.data.hash);

    console.log(result1);
    // console.log(result2);
    // console.log(result3);
    // console.log(result4);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

