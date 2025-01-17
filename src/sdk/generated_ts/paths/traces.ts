import * as ApiCallers from "../lib/api_callers";
import { tx_id, Trace } from "../types";

export function getTraces(
  parameters?: {
    transactions: tx_id[],
    articulate?: boolean,
    filter?: string,
    statediff?: boolean,
    count?: boolean,
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
  return ApiCallers.fetch<Trace[]>(
    {
      endpoint: '/traces', method: 'get', parameters, options,
    },
  );
}
