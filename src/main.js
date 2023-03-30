'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
  'bbde9c75805392c9098c6489c3002e07331ef949cc1fa0b63b2b24d3eb6bebfc'
);

const myWalletAddress = myKey.getPublic('hex');

const Evolve = new Blockchain();

Evolve.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.sign(myKey);
Evolve.addTransaction(tx1);

Evolve.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.sign(myKey);
Evolve.addTransaction(tx2);

Evolve.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of X is ${Evolve.getBalanceOfAddress(myWalletAddress)}`
);

console.log();
console.log('Blockchain valid?', Evolve.isChainValid() ? 'Yes' : 'No');