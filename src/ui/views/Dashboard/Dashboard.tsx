import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardIndexesLocation,
  DashboardMonitorsLocation,
  DashboardOverviewLocation
} from '../../locations';
import { cookieVars } from '../../utils';
import { AccountsView } from './Tabs/Accounts/Accounts';
import { Collections } from './Tabs/Collections';
import { Indexes } from './Tabs/Indexes';
import { Monitors } from './Tabs/Monitors';
import { Overview } from './Tabs/Overview';

export const DashboardView = () => {
  const title = 'Dashboard';
  var tabs = [
    {name: "Overview", location: DashboardOverviewLocation, component: <Overview />, disabled: false},
    {name: "Accounts", location: DashboardAccountsLocation, component: <AccountsView />, disabled: false},
    {name: "Monitors", location: DashboardMonitorsLocation, component: <Monitors />, disabled: false},
    {name: "Collections", location: DashboardCollectionsLocation, component: <Collections />, disabled: false},
    {name: "Indexes", location: DashboardIndexesLocation, component: <Indexes />, disabled: false},
  ];
  return (
    <BaseView
      title={title}
      defaultActive={DashboardOverviewLocation}
      cookieName={cookieVars.dashboard_current_tab}
      tabs={tabs}
    />
  );
};
