import * as ApiCallers from "../lib/api_callers";
import { PinnedChunk, Manifest } from "../types";

export function getPins(
  parameters?: {
    list?: boolean,
    init?: boolean,
    all?: boolean,
    share?: boolean,
    sleep?: number,
    chain: string,
    noHeader?: boolean,
    fmt?: string,
    verbose?: boolean,
    logLevel?: number,
    wei?: boolean,
    ether?: boolean,
    dollars?: boolean,
    raw?: boolean,
    toFile?: boolean,
  },
  options?: RequestInit,
) {
  return ApiCallers.fetch<PinnedChunk[] | Manifest[]>(
    {
      endpoint: '/pins', method: 'get', parameters, options,
    },
  );
}
