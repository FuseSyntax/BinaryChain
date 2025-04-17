import { ec } from './cryptoUtil';
import { Transaction } from './transaction';

export class Wallet {
  public keyPair: elliptic.ec.KeyPair;
  public privateKey: string;
  public publicKey: string;

  constructor() {
    this.keyPair = ec.genKeyPair();
    this.privateKey = this.keyPair.getPrivate('hex');
    this.publicKey = this.keyPair.getPublic('hex');
  }

  static fromPrivateKey(privateKey: string): Wallet {
    const wallet = new Wallet();
    wallet.keyPair = ec.keyFromPrivate(privateKey, 'hex');
    wallet.privateKey = privateKey;
    wallet.publicKey = wallet.keyPair.getPublic('hex');
    return wallet;
  }

  signTransaction(transaction: Transaction): void {
    const hashTx = transaction.calculateHash();
    const signature = this.keyPair.sign(hashTx, 'base64');
    transaction.signature = signature.toDER('hex');
  }
}