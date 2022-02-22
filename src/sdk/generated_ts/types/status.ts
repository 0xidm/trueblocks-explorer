import { timestamp, Cache, Chain } from "../types";

export type Status = {
  clientVersion: string
  clientIds: string
  trueblocksVersion: string
  rpcProvider: string
  configPath: string
  cachePath: string
  indexPath: string
  host: string
  isTesting: boolean
  isApi: boolean
  isDocker: boolean
  isScraping: boolean
  isArchive: boolean
  isTracing: boolean
  hasEskey: boolean
  hasPinkey: boolean
  ts: timestamp
  caches: Cache[]
  chains: Chain[]
}
