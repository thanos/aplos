var ConvertLib = artifacts.require("./ConvertLib.sol");
var Ferro = artifacts.require("./Ferro.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Ferro);
  deployer.deploy(Ferro);
};
