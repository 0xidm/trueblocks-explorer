import * as ApiCallers from "../lib/api_callers";
import { tx_id, Receipt } from "../types";

export function getReceipts(
  parameters?: {
    transactions: tx_id[],
    articulate?: boolean,
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
  return ApiCallers.fetch<Receipt[]>(
    {
      endpoint: '/receipts', method: 'get', parameters, options,
    },
  );
}
