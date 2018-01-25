var ParentApprover = artifacts.require('./ParentApprover.sol');

contract('ParentApprover', function(accounts) {

  let contract;
  let contractAddress;
  let parent = accounts[0];

  before(async function(){
    contract = await ParentApprover.deployed();
    contractAddress = contract.address;
  });

  it("Cannot send money to contract if parent is not set", async function() {
    await web3.eth.sendTransaction({from: accounts[0], to: contractAddress, value: web3.toWei('1', 'ether')});

    let contractBalance = await web3.eth.getBalance(contractAddress);
    assert(contractBalance.toNumber() == 0, "contract should not have value if no parent is set");

  });

  it("Contract should have balance if parent is set and value is sent", async function() {
    const valueToSend = web3.toWei('1', 'ether');
    await contract.setParent(parent);

    await web3.eth.sendTransaction({from: accounts[0], to: contractAddress, value: valueToSend});

    const contractBalance = await web3.eth.getBalance(contractAddress).toNumber();
    assert(contractBalance == valueToSend, `contract should have value if parent is set but has ${contractBalance}`);
  });
});
