import * as ApiCallers from "../lib/api_callers";
import { Name } from "../types";

export function getNames(
  parameters?: {
    terms: string[],
    expand?: boolean,
    matchCase?: boolean,
    all?: boolean,
    custom?: boolean,
    prefund?: boolean,
    named?: boolean,
    addr?: boolean,
    tags?: boolean,
    delete?: boolean,
    undelete?: boolean,
    remove?: boolean,
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
  return ApiCallers.fetch<Name[]>(
    {
      endpoint: '/names', method: 'get', parameters, options,
    },
  );
}
