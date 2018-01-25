var ParentApprover = artifacts.require('./ParentApprover.sol');

contract('ParentApprover', function(accounts) {
  let contract;
  const parent = accounts[0];
  const child = accounts[1];

  before(async function(){
    contract = await ParentApprover.deployed();
    await contract.setChild(child);
    await contract.setParent(parent);

    await web3.eth.sendTransaction({from: parent, to: contract.address, value: web3.toWei('1', 'ether')});
  });

  it("Parent can approve transaction", async function() {
    return new Promise(async (resolve,reject) => {
      const destinationAddress = accounts[3];
      const valueToSend = web3.toWei(0.1, 'ether');
      const destinationBalanceBefore = await web3.eth.getBalance(destinationAddress);
      const contractBalanceBefore = await web3.eth.getBalance(contract.address).toNumber();
      const expectedTransactionId = 1; // not great to hardcode however this should be one on new contract.

      var event = contract.Execution([expectedTransactionId], async function(error,result){

        const destinationBalanceAfter = await web3.eth.getBalance(destinationAddress);
        const expectedValueAfter = Number(valueToSend) + destinationBalanceBefore.toNumber();

        assert(destinationBalanceAfter.toNumber() == expectedValueAfter);

        const contractBalanceAfter = await web3.eth.getBalance(contract.address).toNumber();

        assert(contractBalanceAfter === contractBalanceBefore - valueToSend);
        resolve();
      });

      //nesting sucks, find a better way that preserves using transaction number
      var event = contract.Submission([expectedTransactionId], async function(error, result){
        if (error){
          reject();
          return;
        }

        await contract.executeTransaction(expectedTransactionId);

      });

       await contract.submitTransaction(destinationAddress,valueToSend);
    });

  });

  it("Parent can get details of transaction to approve", async function() {
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });

  it("Parent can get list of transactions to approve", async function() {
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });

  it("Parent should not be able to approve same transation twice", async function() {
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });

  it("Parent should be able to decline transation", async function() {
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });

  it("Should not try and send if balance is not enough", async function() {
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });

});
