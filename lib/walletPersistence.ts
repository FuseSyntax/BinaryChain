import { Wallet } from './wallet';

export const getOrCreateWallet = (): Wallet => {
  const storedPrivateKey = localStorage.getItem('walletPrivateKey');
  if (storedPrivateKey) {
    return Wallet.fromPrivateKey(storedPrivateKey);
  } else {
    const wallet = new Wallet();
    localStorage.setItem('walletPrivateKey', wallet.privateKey);
    return wallet;
  }
};