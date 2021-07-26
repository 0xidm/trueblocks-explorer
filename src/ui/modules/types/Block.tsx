import { address, blknum, date, double, gas, hash, timestamp, TransactionArray, uint64 } from '@modules/types';

export declare type Block = {
  gasLimit: gas;
  gasUsed: gas;
  hash: hash;
  blockNumber: blknum;
  parentHash: hash;
  miner: address;
  difficulty: uint64;
  price: double;
  finalized: boolean;
  timestamp: timestamp;
  transactions: TransactionArray;
  tx_hashes: string[];
  name: string;
  light: boolean;
  date: date;
  unclesCnt: uint64;
  extraData: string;
};
export declare type BlockArray = Block[];
