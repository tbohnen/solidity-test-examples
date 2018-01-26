var ParentApprover = artifacts.require('./ParentApprover.sol');

 contract('ParentApprover', function(accounts) {
   let contract;
   const parent = accounts[0];
   const child = accounts[1];

  before(async function(){
    contract = await ParentApprover.deployed();
  });

  it("Can assign a child if child is not already set", async function() {
    await contract.setChild(child);
    const assignedChild = await contract.getChild();
    assert.equal(assignedChild, child);
  });

  it("Cannot re-assign the child if child is already set", async function() {
    var res = await contract.setChild(accounts[2]);
    const assignedChild = await contract.getChild();
    assert.equal(assignedChild, child, "Child is not equal to original child");
    assert(assignedChild != accounts[2]);
  });

});

