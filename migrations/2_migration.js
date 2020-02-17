// eslint-disable-next-line no-undef
const Sample = artifacts.require("Sample.sol");

module.exports = function (deployer) {
  deployer.deploy(Sample);
};