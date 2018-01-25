var ParentApprover = artifacts.require("ParentApprover");

module.exports = function(deployer) {
  deployer.deploy(ParentApprover);
};
