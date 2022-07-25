const myeth = artifacts.require("myeth");

module.exports = function (deployer) {
  deployer.deploy(myeth);
};
