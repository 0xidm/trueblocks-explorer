import { BaseView_old as BaseViewOld } from '@components/BaseView_old';
import { Result, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { createErrorNotification } from '@modules/error_notification';
import {
  AssetHistory,
  AssetHistoryArray,
  // Balance,
  createEmptyAccountname,
  Reconciliation,
  Transaction
} from '@modules/types';
import { either as Either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardLocation,
  DashboardMonitorsLocation
} from '../../Routes';
import { useGlobalNames, useGlobalState } from '../../State';
import { Collections } from './Tabs/Collections';
import { DetailsView } from './Tabs/Details';
import { Monitors } from './Tabs/Monitors';

export const DashboardView = () => {
  const [loading, setLoading] = useState(false);
  const [staging, setStaging] = useState(false);
  const [denom, setDenom] = useState('ether');
  const [hideZero, setHideZero] = useState('all');
  const [hideNamed, setHideNamed] = useState(false);
  const [hideReconciled, setHideReconciled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [period, setPeriod] = useState('by tx');

  const { currentAddress } = useGlobalState();
  const { namesMap } = useGlobalNames();
  const { totalRecords, setTotalRecords } = useGlobalState();
  const {
    transactions: {
      // TODO: this should not require that much destructuring
      result: {
        status: transactionsStatus,
        data: transactions,
        meta: transactionsMeta,
      },
      // loading: transactionsLoading,
    },
    setTransactions,
  } = useGlobalState();

  if (transactionsStatus === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transactions',
    });
  }

  useEffect(() => {
    (async () => {
      if (currentAddress?.slice(0, 2) === '0x') {
        setLoading(true);
        const eitherResponse = await runCommand('list', {
          count: true,
          appearances: true,
          addrs: currentAddress,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result),
        );

        setTotalRecords(result.status === 'success' ? result.data[0]?.nRecords : 0);
        setLoading(false);
      }
    })();
  }, [currentAddress, staging]);

  useEffect(() => {
    (async () => {
      if (totalRecords && (transactions.length || 0) < totalRecords) {
        const eitherResponse = await runCommand('export', {
          addrs: currentAddress || '', // TODO: this is a quick and dirty fix
          fmt: 'json',
          cache_txs: true,
          cache_traces: true,
          staging: false, // staging,
          unripe: false, // unripe: true,
          ether: true,
          dollars: false,
          articulate: true,
          accounting: true,
          reversed: false,
          relevant: true,
          // summarize_by: 'monthly',
          first_record: transactions.length || 0,
          max_records: (() => {
            if (transactions.length < 50) return 10;

            if (transactions.length < 150) return 71;

            if (transactions.length < 1500) return 239;

            return 639; /* an arbitrary number not too big, not too small, that appears not to repeat */
          })(),
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result),
        );
        // TODO: fix this mutation
        // const newTransactions: Result = transactions.length ? { status: transactionsStatus, data: transactions, meta: transactionsMeta } : toSuccessfulData(emptyData);
        const newTransactions = toSuccessfulData({
          data: [...transactions, ...result.data],
          meta: transactionsMeta,
        });

        setTransactions({ result: newTransactions, loading: false });
      }
    })();
  }, [totalRecords, transactions]);

  const getMeta = useCallback((response) => (response?.status === 'fail' ? [] : response?.meta), []);
  const theMeta: any = getMeta(transactions);

  const [theData, setTheData] = useState<Transaction[]>([]);

  // should be useMemo really
  useEffect(() => {
    setTheData((transactions as Transaction[]).map((transaction, index) => {
      const newId = String(index + 1);
      const fromName = namesMap.get(transaction.from) || createEmptyAccountname();
      const toName = namesMap.get(transaction.to) || createEmptyAccountname();

      return {
        ...transaction,
        id: newId,
        fromName,
        toName,
      };
    }));
  }, [transactions]);

  useEffect(() => {
    setTheData(theData.filter((transaction) => {
      if (!hideReconciled) return true;

      return transaction.statements.some(({ reconciled }) => !reconciled);
    }));
  }, [hideReconciled]);

  const uniqAssets = useMemo(() => {
    if (!theData.length) return [];

    const unique: Array<AssetHistory> = [];

    theData.forEach((tx: Transaction) => {
      tx.statements?.forEach((statement: Reconciliation) => {
        if (unique.find((asset: AssetHistory) => asset.assetAddr === statement.assetAddr) === undefined) {
          unique.push({
            assetAddr: statement.assetAddr,
            assetSymbol: statement.assetSymbol,
            balHistory: [],
          });
        }
      });

      unique.forEach((asset: AssetHistory, index: number) => {
        const found = tx.statements?.find((statement: Reconciliation) => asset.assetAddr === statement.assetAddr);
        if (found) {
          unique[index].balHistory = [
            ...unique[index].balHistory,
            { balance: found.endBal, date: new Date(found.timestamp * 1000), reconciled: found.reconciled },
          ];
        }
      });
    });

    unique.sort((a: any, b: any) => {
      if (b.balHistory.length === a.balHistory.length) {
        if (b.balHistory.length === 0) {
          return b.assetAddr - a.assetAddr;
        }
        return b.balHistory[b.balHistory.length - 1].balance - a.balHistory[a.balHistory.length - 1].balance;
      }
      return b.balHistory.length - a.balHistory.length;
    });

    return unique.filter((asset: AssetHistory) => {
      if (asset.balHistory.length === 0) return false;
      const show = hideZero === 'all'
        || (hideZero === 'show' && Number(asset.balHistory[asset.balHistory.length - 1].balance) === 0)
        || (hideZero === 'hide' && Number(asset.balHistory[asset.balHistory.length - 1].balance) > 0);
      return show && (!hideNamed || !namesMap.get(asset.assetAddr));
    });
  }, [theData]);

  const params: AccountViewParams = {
    loading,
    setLoading,
    prefs: {
      denom,
      setDenom,
      staging,
      setStaging,
      hideZero,
      setHideZero,
      hideNamed,
      setHideNamed,
      hideReconciled,
      setHideReconciled,
      showDetails,
      setShowDetails,
      period,
      setPeriod,
    },
    totalRecords,
    theData,
    setTransactions,
    theMeta,
    uniqAssets,
  };

  const tabs = [
    { name: 'Monitors', location: DashboardMonitorsLocation, component: <Monitors /> },
    {
      name: 'Details',
      location: DashboardAccountsLocation,
      component: <DetailsView params={params} />,
    },
    { name: 'Collections', location: DashboardCollectionsLocation, component: <Collections /> },
  ];

  return (
    <>
      <BaseViewOld
        title="Dashboard"
        cookieName="COOKIE_DASHBOARD"
        tabs={tabs}
        defaultActive={DashboardMonitorsLocation}
        baseActive={DashboardLocation}
      />
    </>
  );
};

declare type stateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;
export declare type UserPrefs = {
  denom: string;
  setDenom: stateSetter<string>;
  staging: boolean;
  setStaging: stateSetter<boolean>;
  hideZero: string;
  setHideZero: stateSetter<string>;
  hideNamed: boolean;
  setHideNamed: stateSetter<boolean>;
  hideReconciled: boolean;
  setHideReconciled: stateSetter<boolean>;
  showDetails: boolean;
  setShowDetails: stateSetter<boolean>;
  period: string;
  setPeriod: stateSetter<string>;
};

export declare type AccountViewParams = {
  prefs: UserPrefs;
  loading: boolean;
  setLoading: stateSetter<boolean>;
  totalRecords: number | null;
  theData: any;
  // This should not be passed down, as it is in GlobalState
  setTransactions: any;
  theMeta: any;
  uniqAssets: AssetHistoryArray;
};
