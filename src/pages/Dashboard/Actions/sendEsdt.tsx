import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  refreshAccount,
  transactionServices,
  useGetAccountInfo
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
  BytesValue
} from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';
import fetch from 'node-fetch';
import React from 'react';

const SendEsdt = () => {
  const RewardTokenIdentifier =
    '@564f5445554b323032342d353534646362@01@70696e67';
  const PemFile = './walltes/dApp-wallet1.pem';

  const ProxyUrl = 'https://devnet-gateway.elrond.com';
  const ApiUrl = 'https://devnet-api.elrond.com';

  const __dirname = dirname(fileURLToPath('./wallets'));
  const { address } = useGetAccountInfo();

  const main = async () => {
    const provider = new ProxyProvider(ProxyUrl, { timeout: 5000 });
    const signer = await getSigner();
    const account = new Account(signer.getAddress());

    console.log('sending first tx in 10s ...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await NetworkConfig.getDefault().sync(provider);
    await account.sync(provider);

    let count = 0;

    count += 1;

    const tx = await buildRewardTransactionFor(address);
    tx.setNonce(account.nonce);
    await signer.sign(tx);
    account.incrementNonce();
    await tx.send(provider);

    if (count === 1) {
      await new Promise((r) => setTimeout(r, 10000));
    }

    await new Promise((r) => setTimeout(r, 300)); // ~ 3 txs / s = 18 txs / block, in a 6 second block

    console.log('guess what? we are done!');
  };

  const getSigner = async () => {
    const pemWalletContents = await fs.promises.readFile(PemFile, {
      encoding: 'utf8'
    });
    return UserSigner.fromPem(pemWalletContents);
  };

  const buildRewardTransactionFor = async (receiverAddress: string) =>
    new Transaction({
      data: TransactionPayload.contractCall()
        .setFunction(new ContractFunction('ESDTTransfer'))
        .addArg(BytesValue.fromUTF8(RewardTokenIdentifier))
        .build(),
      gasLimit: new GasLimit(500000),
      receiver: new Address(receiverAddress),
      value: Balance.Zero()
    });

  main();
};

export default SendEsdt;
