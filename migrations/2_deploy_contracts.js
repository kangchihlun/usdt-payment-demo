const USDT = artifacts.require('TetherToken.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addresses) {
  const [admin, payer, _] = addresses;

  if(network == 'develop') {
    await deployer.deploy(USDT);
    const usdt = await USDT.deployed();
    await usdt.faucet(payer, web3.utils.toWei('10000')); //to 18 decimal
    await deployer.deploy(PaymentProcessor, admin, usdt.address);
    // 1 Dai token = 1 * 10 ^ 18 "dai wei"
  }
  else if(network == 'goerli') {
    await deployer.deploy(USDT);
    const usdt = await USDT.deployed();
    var _admin = '0x8529eD53d5BC60c9a240507aEC950bfcd686d8f7'
    // 消費者用的測試帳號，先拿個2萬來花花
    var buyer = '0xEF20c651B433452875C92930Adcf4a6E1b2cb487'
    await usdt.faucet(buyer, web3.utils.toWei('20000')); //to 18 decimal

    await deployer.deploy(PaymentProcessor, _admin, usdt.address);
  }
  else if(network == 'mainnet'){
    // USDT 早就在主網了，直接用
    const ADMIN_ADDRESS = '0x8529eD53d5BC60c9a240507aEC950bfcd686d8f7';
    const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
    await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, USDT_ADDRESS);
  }
};
