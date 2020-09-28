import { ethers, Contract } from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import USDT from './contracts/TetherToken.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable(); // 等待 metamask 視窗用戶同意
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //const signerAddress = await signer.getAddress();

        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );

        const usdt = new Contract(
          USDT.networks[window.ethereum.networkVersion].address, //for mainnet and public testnet replace by address of already deployed dai token
          USDT.abi,
          signer
        );

        resolve({provider, paymentProcessor, usdt});
      }
      resolve({provider: undefined, paymentProcessor: undefined, dai: undefined});
    });
  });

export default getBlockchain;


