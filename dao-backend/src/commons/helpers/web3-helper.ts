import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import EthereumTxAll, { Transaction, TxData } from 'ethereumjs-tx';
import { publicKeyByPrivateKey } from 'eth-crypto';

@Injectable()
export class Web3Helper {
  web3;

  instantiateWeb3(providerUrl: string): void {
    try {
      this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
    } catch (error) {
      throw new Error(
        `NETWORK CONNECTION FAILED WITH PROVIDER: ${providerUrl}`,
      );
    }
  }

  createAccount() {
    const account = this.web3.eth.accounts.create();
    return {
      address: account['address'],
      publicKey: `0x${publicKeyByPrivateKey(account['privateKey'])}`,
      privateKey: account['privateKey'],
    };
  }

  getContractInstance(contractAbi: any, contractAddress: string) {
    try {
      return new this.web3.eth.Contract(contractAbi, contractAddress);
    } catch {
      throw new Error(`GET CONTRACT FAILED: ${contractAddress}`);
    }
  }

  async buildTx(
    data: string,
    contractAddress: string,
    accountAddress: string,
    value?: number,
  ): Promise<TxData> {
    const nonce: number = await this.getNonce(accountAddress);
    const gasPrice: number = Math.floor(
      (await this.web3.eth.getGasPrice()) * 1.5,
    );
    return {
      data: data,
      to: contractAddress,
      nonce: nonce,
      gasLimit: '0x3d0900',
      gasPrice: gasPrice,
      value: value ? value : 0,
    };
  }

  signTx(txData: TxData, privateKey: string): string {
    const tx: Transaction = new EthereumTxAll(txData);
    const privateKeyBuffered: Buffer = Buffer.from(
      privateKey.substring(2),
      'hex',
    );
    tx.sign(privateKeyBuffered);
    return `0x${tx.serialize().toString('hex')}`;
  }

  async sendSignedTx(signedTx: string): Promise<void> {
    await this.web3.eth
      .sendSignedTransaction(signedTx)
      .on('transactionHash', (hash) => {
        console.debug(`Transaction hash ${hash}`);
      })
      .on('receipt', (receipt) => {
        console.debug(`Transaction receipt: ${JSON.stringify(receipt)}`);
      })
      .catch('error', (error) => {
        throw error;
      });
  }

  async getNonce(accountAddress: string): Promise<number> {
    return this.web3.eth.getTransactionCount(accountAddress);
  }
}
