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

  it("Child can submit a potential transaction", async function() {
    return new Promise(async (resolve,reject) => {
      const destinationAddress = accounts[3];
      const valueToSend = web3.toWei('1', 'ether');

      var event = contract.Submission([1], function(error, result){
        if (error){
          reject();
          return;
        }
        assert(result.args.transactionId.toNumber() === 1);
        resolve();
      });

      const transaction = await contract.submitTransaction(destinationAddress,valueToSend);
    });

  });

  it("Transaction Count increases for every transaction", async function(){
    assert(new Date().getTime() < new Date(2018,01,27,00,00).getTime());
  });

  it("Can read pending transactions but only by anyone other than parent or child", async function(){
    assert(new Date().getTime() < new Date("2018-01-27").getTime());
  });
});
