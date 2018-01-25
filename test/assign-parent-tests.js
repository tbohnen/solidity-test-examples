var ParentApprover = artifacts.require('./ParentApprover.sol');

contract('ParentApprover', function(accounts) {
  let contract;
  const parent = accounts[0];

  before(async function(){
    contract = await ParentApprover.deployed();
  });

  it("Contract is deployed", async function() {
    assert(contract);
  });

  it("Parent should be empty in a new contract", async function() {
    const parent = await contract.getParent();
    assert.equal(parent, '0x0000000000000000000000000000000000000000');
  });

  it("Can assign a parent if parent is not already set", async function() {
    await contract.setParent(parent);
    const assignedParent = await contract.getParent();
    assert.equal(assignedParent, parent);
  });

  it("Cannot re-assign a parent if parent is already set", async function() {
    var res = await contract.setParent(accounts[1]);
    const assignedParent = await contract.getParent();
    assert.equal(assignedParent, parent, "Parent is not equal to original parent");
  });

});

