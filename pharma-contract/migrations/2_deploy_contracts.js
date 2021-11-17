var PharmaSupplyChain = artifacts.require("PharmaContract");


module.exports = function (deployer) {
  deployer.deploy(PharmaSupplyChain);
};
