import { blknum, hash, timestamp, Datetime, address, uint64, double, int256 } from "../types";

export type Reconciliation = {
  blockNumber: blknum
  transactionIndex: blknum
  logIndex: blknum
  transactionHash: hash
  timestamp: timestamp
  date: Datetime
  assetAddr: address
  assetSymbol: string
  decimals: uint64
  spotPrice: double
  priceSource: string
  accountedFor: address
  sender: address
  recipient: address
  begBal: int256
  amountNet: int256
  endBal: int256
  encoding: string
  signature: string
  reconciliationType: string
  reconciled: boolean
  totalIn: int256
  amountIn: int256
  internalIn: int256
  selfDestructIn: int256
  minerBaseRewardIn: int256
  minerNephewRewardIn: int256
  minerTxFeeIn: int256
  minerUncleRewardIn: int256
  prefundIn: int256
  totalOut: int256
  amountOut: int256
  internalOut: int256
  selfDestructOut: int256
  gasOut: int256
  totalOutLessGas: int256
  prevAppBlk: blknum
  prevBal: int256
  begBalDiff: int256
  endBalDiff: int256
  endBalCalc: int256
}
