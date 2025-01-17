import { uint64, CacheEntry } from "../types";

export type Cache = {
  type: string
  path: string
  nFiles: uint64
  nFolders: uint64
  sizeInBytes: uint64
  items: CacheEntry[]
}
