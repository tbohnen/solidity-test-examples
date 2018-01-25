pragma solidity ^0.4.17;

contract ParentApprover {

  address private parent;
  address private child;
  uint transactionCount = 1;
  event Submission(uint indexed transactionId);
  event Execution(uint indexed transactionId);

  mapping (uint => Transaction) public transactions;

  struct Transaction {
    address destination;
    uint value;
    bool executed;
  }

  modifier onlyParentOrChild {
    require(msg.sender == child || msg.sender == parent);
    _;
  }

  function setChild(address childAddress) public {
    require(child == 0x0000000000000000000000000000000000000000);
    child = childAddress;
  }

  function getChild() public view returns (address childAddress) {
    return child;
  }

  function setParent(address parentAddress) public {
    require(parent == 0x0000000000000000000000000000000000000000);
    parent = parentAddress;
  }

  function getParent() public view returns (address parentAddress) {
    return parent;
  }

  function submitTransaction(address destination, uint value)
    public
    returns (uint transactionId)
  {
    transactionId = transactionCount;
    transactions[transactionId] = Transaction({
      destination: destination,
          value: value,
          executed: false
          });
    transactionCount+=1;
    Submission(transactionId);
  }


  function executeTransaction(uint transactionId) public {
    Transaction memory txn = transactions[transactionId];

    if (!txn.executed) {
      txn.executed = true;

      if (txn.destination.call.value(txn.value)())
        Execution(transactionId);
    }
  }
  function () public payable {
    require(parent != 0x0000000000000000000000000000000000000000);
  }
}
