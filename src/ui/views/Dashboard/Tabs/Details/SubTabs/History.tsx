import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';

import { BaseView } from '@components/BaseView';
import { FilterButton } from '@components/FilterButton';
import { addColumn, BaseTable } from '@components/Table';
import { useSearchParams } from '@hooks/useSearchParams';
import {
  applyFilters,
} from '@modules/filters/transaction';
import { TransactionModel } from '@modules/types/models/Transaction';

import {
  DashboardAccountsHistoryCustomLocation,
  DashboardAccountsHistoryEventsLocation,
  DashboardAccountsHistoryFunctionsLocation,
  DashboardAccountsHistoryReconsLocation,
} from '../../../../../Routes';
import { useGlobalState } from '../../../../../State';
import { AccountViewParams } from '../../../Dashboard';
import { DateDisplay } from '../components/DateDisplay';
import { ExtraDisplay } from '../components/ExtraDisplay';
import { FromToDisplay } from '../components/FromToDisplay';
import { StatementDisplay } from '../components/StatementDisplay';
import { HistoryEvents } from './HistoryEvents';
import { HistoryFunctions } from './HistoryFunctions';
import { HistoryRecons } from './HistoryRecons';

const searchParamAsset = 'asset';
const searchParamEvent = 'event';
const searchParamFunction = 'function';

export const History = ({ params }: { params: AccountViewParams }) => {
  const { theData, loading } = params;
  const { showReversed } = params.userPrefs;
  const { currentAddress, namesMap, chain } = useGlobalState();
  const history = useHistory();
  const { pathname } = useLocation();
  const [assetToFilterBy, setAssetToFilterBy] = useState('');
  const [eventToFilterBy, setEventToFilterBy] = useState('');
  const [functionToFilterBy, setFunctionToFilterBy] = useState('');
  const searchParams = useSearchParams();

  const assetNameToDisplay = useMemo(() => {
    if (!assetToFilterBy) return '';

    const matchedName = namesMap.get(assetToFilterBy);

    if (!matchedName) return '';

    return matchedName.name;
  }, [assetToFilterBy, namesMap]);

  useEffect(
    () => {
      setAssetToFilterBy(
        searchParams.get(searchParamAsset) || '',
      );

      setEventToFilterBy(
        searchParams.get(searchParamEvent) || '',
      );

      setFunctionToFilterBy(
        searchParams.get(searchParamFunction) || '',
      );
    },
    [searchParams],
  );

  const filteredData = useMemo(() => {
    let ret;
    if (!assetToFilterBy && !eventToFilterBy && !functionToFilterBy) {
      ret = theData;
    } else {
      ret = applyFilters(theData, {
        assetAddress: assetToFilterBy,
        eventName: eventToFilterBy,
        functionName: functionToFilterBy,
      });
    }
    if (showReversed) {
      return ret.sort((b: TransactionModel, a: TransactionModel) => {
        if (a.blockNumber === b.blockNumber) return a.transactionIndex - b.transactionIndex;
        return a.blockNumber - b.blockNumber;
      });
    }
    return ret.sort((a: TransactionModel, b: TransactionModel) => {
      if (a.blockNumber === b.blockNumber) return a.transactionIndex - b.transactionIndex;
      return a.blockNumber - b.blockNumber;
    });
  }, [assetToFilterBy, eventToFilterBy, functionToFilterBy, theData, showReversed]);

  useEffect(() => {
    setAssetToFilterBy('');
    setEventToFilterBy('');
    setFunctionToFilterBy('');
  }, [chain]);

  const makeClearFilter = (searchParamKey: string) => () => {
    const searchString = searchParams.delete(searchParamKey).toString();
    history.replace(`${pathname}?${searchString}`);
  };

  const activeAssetFilter = (
    <FilterButton
      visible={Boolean(assetToFilterBy)}
      onClick={makeClearFilter(searchParamAsset)}
    >
      {`Asset: ${assetNameToDisplay || assetToFilterBy}`}
    </FilterButton>
  );

  const activeEventFilter = (
    <FilterButton
      visible={Boolean(eventToFilterBy)}
      onClick={makeClearFilter(searchParamEvent)}
    >
      {`Event: ${eventToFilterBy}`}
    </FilterButton>
  );

  const activeFunctionFilter = (
    <FilterButton
      visible={Boolean(functionToFilterBy)}
      onClick={makeClearFilter(searchParamFunction)}
    >
      {`Function: ${functionToFilterBy}`}
    </FilterButton>
  );

  const siderRender = (record: TransactionModel) => (
    <AccountHistorySider record={record} params={params} />
  );

  return (
    <div>
      {activeAssetFilter}
      {activeEventFilter}
      {activeFunctionFilter}
      <BaseTable
        dataSource={filteredData}
        columns={transactionSchema}
        loading={loading}
        extraData={currentAddress}
        siderRender={siderRender}
        name='history'
      />
    </div>
  );
};

export const AccountHistorySider = ({ record, params }: { record: TransactionModel; params: AccountViewParams }) => {
  const tabs = [
    {
      name: 'Events',
      location: DashboardAccountsHistoryEventsLocation,
      component: <HistoryEvents record={record} />,
    },
    {
      name: 'Function',
      location: DashboardAccountsHistoryFunctionsLocation,
      component: <HistoryFunctions record={record} />,
    },
    {
      name: 'Reconciliations',
      location: DashboardAccountsHistoryReconsLocation,
      component: <HistoryRecons record={record} params={params} />,
    },
    {
      name: 'Custom',
      location: DashboardAccountsHistoryCustomLocation,
      component: <pre>{JSON.stringify(record?.to, null, 2)}</pre>,
    },
  ];

  if (!record) return <></>;
  return <BaseView title='' cookieName='COOKIE_DASHBOARD_DETAILS' tabs={tabs} />;
};

export const transactionSchema: ColumnsType<TransactionModel> = [
  addColumn({
    title: 'Date',
    dataIndex: 'date',
    configuration: {
      width: '15%',
      render: (unused, record) => <DateDisplay record={record} />,
    },
  }),
  addColumn({
    title: 'From / To',
    dataIndex: 'from',
    configuration: {
      width: '30%',
      render: (unused, record) => <FromToDisplay record={record} />,
    },
  }),
  addColumn({
    title: 'Reconciliations (asset, beg, in, out, gasOut, end, check)',
    dataIndex: 'compressedTx',
    configuration: {
      width: '50%',
      render: (unused, record) => <StatementDisplay record={record} />,
    },
  }),
  addColumn({
    title: '',
    dataIndex: 'statements',
    configuration: {
      width: '3%',
      render: (unused, record) => <ExtraDisplay record={record} />,
    },
  }),
];
