import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';
import {
  getEgldLabel,
  refreshAccount,
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import {
  ProxyProvider,
  UserSigner,
  Account,
  Transaction,
  Address,
  Balance,
  TransactionPayload,
  GasLimit,
  NetworkConfig,
  ContractFunction,
  BigUIntValue,
  BytesValue,
  Egld
} from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';
import fetch from 'node-fetch';
import React from 'react';

import { readFile } from 'fs/promise';

const ClaimEgldFaucet = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  //Egld Claim Faucet for blockchain transaction fee
  const PemFile = 'wallet-owner.pem';
  const ProxyUrl = 'https://devnet-gateway.elrond.com';
  const ApiUrl = 'https://devnet-api.elrond.com';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const SendEgldFee = async () => {
    const provider = new ProxyProvider(network.apiAddress);
    const signer = await getSigner();
    const accountSender = new Account(signer.getAddress());

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await NetworkConfig.getDefault().sync(provider);
    await accountSender.sync(provider);

    const tx = await buildRewardTransactionFor(address);
    tx.setNonce(accountSender.nonce);
    await signer.sign(tx);
    await tx.send(provider);
    await new Promise((r) => setTimeout(r, 5000));
  };

  const getSigner = async () => {
    const pemWalletPath = path.join(__dirname, '..', 'wallet', PemFile);
    const pemWalletContents = await fs.promises.readFile(pemWalletPath, {
      encoding: 'utf8'
    });
    return UserSigner.fromPem(pemWalletContents);
  };

  const buildRewardTransactionFor = async (receiverAddress: string) =>
    new Transaction({
      gasLimit: new GasLimit(500000),
      receiver: new Address(receiverAddress),
      value: Balance.egld(0.0006)
    });
};
export default ClaimEgldFaucet;
