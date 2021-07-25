/*
 * Parts of this file were generated with makeClass --js. Edit only those parts of
 * the code outside of the BEG_CODE/END_CODE sections
 */
import { DashboardView, ExplorerView, NamesView, SettingsView, SupportView } from './views';
import { Route, Switch } from 'react-router-dom';

import React from 'react';

const Mousetrap = require('mousetrap');

// BEG_CODE_LOCATIONS
export const RootLocation = '/';

export const DashboardLocation = '/dashboard';
export const DashboardMonitorsLocation = '/dashboard/monitors';
export const DashboardAccountsLocation = '/dashboard/accounts';
export const DashboardAccountsHistoryLocation = '/dashboard/accounts/history';
export const DashboardAccountsHistoryReconsLocation = '/dashboard/accounts/history/recons';
export const DashboardAccountsHistoryFunctionsLocation = '/dashboard/accounts/history/functions';
export const DashboardAccountsHistoryEventsLocation = '/dashboard/accounts/history/events';
export const DashboardAccountsHistoryTracesLocation = '/dashboard/accounts/history/traces';
export const DashboardAccountsHistoryCustomLocation = '/dashboard/accounts/history/custom';
export const DashboardAccountsAssetsLocation = '/dashboard/accounts/assets';
export const DashboardAccountsNeighborsLocation = '/dashboard/accounts/neighbors';
export const DashboardAccountsGasLocation = '/dashboard/accounts/gas';
export const DashboardAccountsChartsLocation = '/dashboard/accounts/charts';
export const DashboardAccountsFunctionsLocation = '/dashboard/accounts/functions';
export const DashboardAccountsEventsLocation = '/dashboard/accounts/events';
export const DashboardCollectionsLocation = '/dashboard/collections';

export const NamesLocation = '/names';
export const NamesAddressesLocation = '/names/addresses';
export const NamesTagsLocation = '/names/tags';
export const NamesFuncSigsLocation = '/names/funcsigs';
export const NamesEventSigsLocation = '/names/eventsigs';
export const NamesBlocksLocation = '/names/blocks';

export const ExplorerLocation = '/explorer';
export const ExplorerBlocksLocation = '/explorer/blocks';
export const ExplorerTransactionsLocation = '/explorer/transactions';
export const ExplorerReceiptsLocation = '/explorer/receipts';
export const ExplorerLogsLocation = '/explorer/logs';
export const ExplorerTracesLocation = '/explorer/traces';

export const SettingsLocation = '/settings';
export const SettingsScrapersLocation = '/settings/scrapers';
export const SettingsIndexesLocation = '/settings/indexes';
export const SettingsIndexGridLocation = '/settings/indexes/grid';
export const SettingsIndexTableLocation = '/settings/indexes/table';
export const SettingsIndexChartsLocation = '/settings/indexes/charts';
export const SettingsIndexManifestLocation = '/settings/indexes/manifest';
export const SettingsCachesLocation = '/settings/caches';
export const SettingsSkinsLocation = '/settings/skins';
export const SettingsSchemasLocation = '/settings/schemas';

export const SupportLocation = '/support';
export const SupportContactUsLocation = '/support/contact-us';
export const SupportDocumentationLocation = '/support/documentation';
export const SupportHotKeysLocation = '/support/hot-keys';
export const SupportLicensingLocation = '/support/licensing';
export const SupportAboutUsLocation = '/support/about-us';
// END_CODE_LOCATIONS

// BEG_CODE_TEMPLATES
export const DashboardAccountsAddressLocationTemplate = '/dashboard/accounts/:address';
export const DashboardAccountsReconsLocationAddressTemplate = '/dashboard/accounts/recons/:address';
export const DashboardAccountsFunctionsLocationAddressTemplate = '/dashboard/accounts/functions/:address';
export const DashboardAccountsGasLocationAddressTemplate = '/dashboard/accounts/gas/:address';
export const DashboardAccountsTracesLocationAddressTemplate = '/dashboard/accounts/traces/:address';

export const DashboardAccountsAddressLocation = (address: string) => `/dashboard/accounts/${address}`;
export const DashboardAccountsReconsLocationAddress = (address: string) => `/dashboard/accounts/recons/${address}`;
export const DashboardAccountsFunctionsLocationAddress = (address: string) => `/dashboard/accounts/functions/${address}`;
export const DashboardAccountsGasLocationAddress = (address: string) => `/dashboard/accounts/gas/${address}`;
export const DashboardAccountsTracesLocationAddress = (address: string) => `/dashboard/accounts/traces/${address}`;
// END_CODE_TEMPLATES

// BEG_CODE_ROUTES
export const routes = [
  {
    path: RootLocation,
    exact: true,
    component: DashboardView,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    path: DashboardLocation,
    exact: true,
    component: DashboardView,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    path: DashboardMonitorsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'Monitors are named addresses that you have indicated are of interest and should be monitored by the scrapers.',
  },
  {
    path: DashboardAccountsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the transactional history of an account.',
  },
  {
    path: DashboardAccountsHistoryLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the transactional history of an account.',
  },
  {
    path: DashboardAccountsHistoryReconsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the reconciliation history of an account.',
  },
  {
    path: DashboardAccountsHistoryFunctionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the functions for a transaction.',
  },
  {
    path: DashboardAccountsHistoryEventsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the events in transaction.',
  },
  {
    path: DashboardAccountsHistoryTracesLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the history of traces for the transaction.',
  },
  {
    path: DashboardAccountsHistoryCustomLocation,
    exact: true,
    component: DashboardView,
    helpText: 'View the logo of the to address for the transaction.',
  },
  {
    path: DashboardAccountsAssetsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address.',
  },
  {
    path: DashboardAccountsNeighborsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address.',
  },
  {
    path: DashboardAccountsGasLocation,
    exact: true,
    component: DashboardView,
    helpText: 'Analyze gas usage.',
  },
  {
    path: DashboardAccountsChartsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address.',
  },
  {
    path: DashboardAccountsFunctionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address.',
  },
  {
    path: DashboardAccountsEventsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'See all assets for a given address.',
  },
  {
    path: DashboardCollectionsLocation,
    exact: true,
    component: DashboardView,
    helpText: 'Collections allow you to group together multiple monitored addresses.',
  },
  {
    path: DashboardAccountsAddressLocationTemplate,
    exact: false,
    component: DashboardView,
    helpText: '',
  },
  {
    path: DashboardAccountsReconsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
    helpText: '',
  },
  {
    path: DashboardAccountsFunctionsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
    helpText: '',
  },
  {
    path: DashboardAccountsGasLocationAddressTemplate,
    exact: false,
    component: DashboardView,
    helpText: '',
  },
  {
    path: DashboardAccountsTracesLocationAddressTemplate,
    exact: false,
    component: DashboardView,
    helpText: '',
  },
  {
    path: NamesLocation,
    exact: true,
    component: NamesView,
    helpText: 'Names are common or known addresses that have been given a name.',
  },
  {
    path: NamesAddressesLocation,
    exact: true,
    component: NamesView,
    helpText: 'Named addresses are a convenient way to keep track of human-readable names for addresses.',
  },
  {
    path: NamesTagsLocation,
    exact: true,
    component: NamesView,
    helpText: 'Tags are groupings used to collect together named addresses.',
  },
  {
    path: NamesFuncSigsLocation,
    exact: true,
    component: NamesView,
    helpText: 'The function signatures tab allows you to add/edit/delete four byte signatures.',
  },
  {
    path: NamesEventSigsLocation,
    exact: true,
    component: NamesView,
    helpText: 'The event signatures tab allows you to add/edit/delete event signatures.',
  },
  {
    path: NamesBlocksLocation,
    exact: true,
    component: NamesView,
    helpText: 'The blocks tab allows you to name particular blocks such as notable smart contract deployments, hard forks, or other blocks.',
  },
  {
    path: ExplorerLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    path: ExplorerBlocksLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain block details.',
  },
  {
    path: ExplorerTransactionsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain transaction details.',
  },
  {
    path: ExplorerReceiptsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain receipt details.',
  },
  {
    path: ExplorerLogsLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain log details.',
  },
  {
    path: ExplorerTracesLocation,
    exact: true,
    component: ExplorerView,
    helpText: 'View blockchain trace details.',
  },
  {
    path: SettingsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    path: SettingsScrapersLocation,
    exact: true,
    component: SettingsView,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    path: SettingsIndexesLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    path: SettingsIndexGridLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Grid view of the index cache.',
  },
  {
    path: SettingsIndexTableLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Table view of the index cache.',
  },
  {
    path: SettingsIndexChartsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Visual display of the index cache.',
  },
  {
    path: SettingsIndexManifestLocation,
    exact: true,
    component: SettingsView,
    helpText: 'The index manifestation.',
  },
  {
    path: SettingsCachesLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View, edit, clean, recover space from the TrueBlocks caches.',
  },
  {
    path: SettingsSkinsLocation,
    exact: true,
    component: SettingsView,
    helpText: 'Change the skin or them of the application.',
  },
  {
    path: SettingsSchemasLocation,
    exact: true,
    component: SettingsView,
    helpText: 'View and edit the schemas for the various screens and tables.',
  },
  {
    path: SupportLocation,
    exact: true,
    component: SupportView,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    path: SupportContactUsLocation,
    exact: true,
    component: SupportView,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    path: SupportDocumentationLocation,
    exact: true,
    component: SupportView,
    helpText: 'Links to various documentation sites.',
  },
  {
    path: SupportHotKeysLocation,
    exact: true,
    component: SupportView,
    helpText: 'A view of all the hot-keys for the program.',
  },
  {
    path: SupportLicensingLocation,
    exact: true,
    component: SupportView,
    helpText: 'Licensing information about the software.',
  },
  {
    path: SupportAboutUsLocation,
    exact: true,
    component: SupportView,
    helpText: 'A short history of TrueBlocks, LLC.',
  }
];
// END_CODE_ROUTES

// BEG_CODE_KEYS
Mousetrap.bind('s m', function () {
  window.location.href = DashboardMonitorsLocation;
});
Mousetrap.bind('s a', function () {
  window.location.href = DashboardAccountsLocation;
});
Mousetrap.bind('s n', function () {
  window.location.href = NamesLocation;
});
Mousetrap.bind('s e', function () {
  window.location.href = ExplorerLocation;
});
Mousetrap.bind('e b', function () {
  window.location.href = ExplorerBlocksLocation;
});
Mousetrap.bind('e t', function () {
  window.location.href = ExplorerTransactionsLocation;
});
Mousetrap.bind('e r', function () {
  window.location.href = ExplorerReceiptsLocation;
});
Mousetrap.bind('e l', function () {
  window.location.href = ExplorerLogsLocation;
});
Mousetrap.bind('e c', function () {
  window.location.href = ExplorerTracesLocation;
});
Mousetrap.bind('s s', function () {
  window.location.href = SettingsLocation;
});
Mousetrap.bind('s u', function () {
  window.location.href = SupportContactUsLocation;
});
Mousetrap.bind('s k', function () {
  window.location.href = SupportHotKeysLocation;
});
// END_CODE_KEYS

const CustomRoute = (props: any) => {
  const { path, component, exact } = props;
  return <Route path={path} component={component} exact={exact} />;
};

export const Routes = () => (
  <Switch>
    {routes.map((props) => (
      <CustomRoute key={props.path} {...props} />
    ))}
    <DashboardView />
  </Switch>
);

