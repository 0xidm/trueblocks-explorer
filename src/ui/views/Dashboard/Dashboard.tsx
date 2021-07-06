import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardLocation,
  DashboardMonitorsLocation,
} from '../../Routes';
import useGlobalState from '../../state';
import { cookieVars } from '../../utils';
import { AccountsView } from './Tabs/Accounts/Accounts';
import { Collections } from './Tabs/Collections';
import { Monitors } from './Tabs/Monitors';

export const DashboardView = ({ match }: { match?: any }) => {
  const { accountAddress } = useGlobalState();
  const title = 'Dashboard';
  var tabs = [
    { name: 'Monitors', location: DashboardMonitorsLocation, component: <Monitors />, disabled: false },
    {
      name: 'Account Details',
      location: DashboardAccountsLocation,
      component: <AccountsView initAddress={accountAddress} />,
      disabled: false,
    },
    { name: 'Collections', location: DashboardCollectionsLocation, component: <Collections />, disabled: false },
  ];

  return (
    <BaseView
      title={title}
      defaultActive={DashboardMonitorsLocation}
      baseActive={DashboardLocation}
      cookieName={cookieVars.dashboard_current_tab}
      tabs={tabs}
    />
  );
};
