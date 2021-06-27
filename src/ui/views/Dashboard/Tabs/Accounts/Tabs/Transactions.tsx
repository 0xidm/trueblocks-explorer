import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  AccountFunctionsLocation,
  AccountGasLocation,
  AccountReconciliationsLocation,
  AccountTracesLocation,
  DashboardAccountsLocation,
} from '../../../../../locations';
import { AccountFunctions } from './Functions';
import { AccountGas } from './Gas';
import { AccountReconciliations } from './Reconciliations';

export const AccountTransactions = ({ record }: any) => {
  const title = '';
  const tabs = [
    {
      name: 'Reconciliations',
      location: AccountReconciliationsLocation,
      component: <AccountReconciliations record={record} />,
    },
    { name: 'Functions / Events', location: AccountFunctionsLocation, component: <AccountFunctions record={record} /> },
    {
      name: 'Gas Accounting',
      location: AccountGasLocation,
      component: <AccountGas record={record} />,
    },
    { name: 'Traces', location: AccountTracesLocation, component: <div>{JSON.stringify(record)}</div> },
  ];
  return (
    <BaseView
      title={title}
      defaultActive={AccountFunctionsLocation}
      baseActive={DashboardAccountsLocation}
      cookieName={'shit'} //cookieVars.explorer_current_tab}
      tabs={tabs}
    />
  );
};
