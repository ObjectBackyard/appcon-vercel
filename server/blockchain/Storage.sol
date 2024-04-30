
// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract Storage {
    
    address public owner;

    /*
    Name: constructor()
    Parameters: n/a
    Returns: n/a
    Description:
        Basic constructor. Permanently sets the owner of the
        contract to the account to be used permanently.
    Notes: n/a
    */
    constructor() {
        owner = msg.sender;
    }

    /*
    Name: ownerOnly
    Parameters: n/a
    Returns: n/a
    Description:
        A modifier that allows only the owner to call a function.
    Notes:
    */
    modifier ownerOnly {
        require(msg.sender == owner, "Only the owner can call this function");
        _; // This just means continue executing the rest of the code
    }

    /*
    Name: fallback & receive
    Parameters: n/a
    Returns: n/a
    Description:
        Stops other accounts from interacting with the contract.
        Used to avoid the contract being flooded with useless data.
    Notes:
    */

    fallback() external payable {
        revert("Only the owner is allowed to interact with this contract.");
    }

    receive() external payable {
        revert("Only the owner is allowed to interact with this contract.");
    }


    struct Transaction {
        string amount;
        string sender_name;
        string stripe_destination_acc;
        string database_user_id;
        string database_transaction_id;
    }

    Transaction[] public records;

/*
    Name: getRecord()
    Parameters:
        uint256 index
    Returns:
        Transaction memory
    Description:
        Returns the structure present at the specific index.
    Notes:
        Obsolete for local database purposes. However, it would be
        left in the final contract to allow other users to access
        the contract records for checking purposes without having to
        use etherscan.
*/
    function getRecord(uint256 index) public view returns (Transaction memory) {
        return records[index];
    }




/*
    Name: addRecord
    Parameters: 
        uint256 _amount, string memory _sender_name, 
        string memory _stripe_destination_acc, 
        string memory _database_user_id,
        string memory _database_transaction_id
    Returns: 
        n/a
    Description:
        Appends a new transaction record to the array in the
        contract.
    Notes: 
        No need to return an error value since solidity will handle
        any errors by itself. They just need to be catched properly in
        the javascript implementation.
*/
    function addRecord(string memory _amount, string memory _sender_name, string memory _stripe_destination_acc, string memory _database_user_id, string memory _database_transaction_id) public ownerOnly {
        
        Transaction memory new_record;
        
        new_record.amount = _amount;
        new_record.sender_name = _sender_name;
        new_record.stripe_destination_acc = _stripe_destination_acc;
        new_record.database_user_id = _database_user_id;
        new_record.database_transaction_id = _database_transaction_id;

        records.push(new_record);
    }
}
