import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardView, ExplorerView, NamesView, SettingsView, SupportView } from './views';

export const RootLocation = '/';
export const DashboardLocation = '/dashboard';
export const DashboardMonitorsLocation = '/dashboard/monitors';
export const DashboardAccountsLocation = '/dashboard/accounts';
export const DashboardAccountsAddressLocationTemplate = '/dashboard/accounts/:address';
export const DashboardAccountsAddressLocation = (address: string) => `/dashboard/accounts/${address}`;
export const AccountReconsLocation = '/dashboard/accounts/recons';
export const AccountReconsLocationAddressTemplate = '/dashboard/accounts/recons/:address';
export const AccountReconsLocationAddress = (address: string) => `/dashboard/accounts/recons/${address}`;
export const AccountFunctionsLocation = '/dashboard/accounts/functions';
export const AccountFunctionsLocationAddressTemplate = '/dashboard/accounts/functions/:address';
export const AccountFunctionsLocationAddress = (address: string) => `/dashboard/accounts/functions/${address}`;
export const AccountGasLocation = '/dashboard/accounts/gas';
export const AccountGasLocationAddressTemplate = '/dashboard/accounts/gas/:address';
export const AccountGasLocationAddress = (address: string) => `/dashboard/accounts/gas/${address}`;
export const AccountTracesLocation = '/dashboard/accounts/traces';
export const AccountTracesLocationAddressTemplate = '/dashboard/accounts/traces/:address';
export const AccountTracesLocationAddress = (address: string) => `/dashboard/accounts/traces/${address}`;
export const AccountRawLocation = '/dashboard/accounts/raw';
export const AccountRawLocationAddressTemplate = '/dashboard/accounts/raw/:address';
export const AccountRawLocationAddress = (address: string) => `/dashboard/accounts/raw/${address}`;
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

const routes = [
  {
    path: RootLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: DashboardLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: DashboardAccountsLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: DashboardAccountsAddressLocationTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: AccountFunctionsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: AccountGasLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: AccountTracesLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: AccountReconsLocationAddressTemplate,
    exact: false,
    component: DashboardView,
  },
  {
    path: AccountFunctionsLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: AccountGasLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: AccountRawLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: AccountTracesLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: AccountReconsLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: DashboardMonitorsLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: DashboardCollectionsLocation,
    exact: true,
    component: DashboardView,
  },
  {
    path: NamesLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: NamesAddressesLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: NamesTagsLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: NamesFuncSigsLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: NamesEventSigsLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: NamesBlocksLocation,
    exact: true,
    component: NamesView,
  },
  {
    path: ExplorerLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: ExplorerBlocksLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: ExplorerTransactionsLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: ExplorerReceiptsLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: ExplorerLogsLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: ExplorerTracesLocation,
    exact: true,
    component: ExplorerView,
  },
  {
    path: SettingsLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsScrapersLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsIndexesLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsIndexGridLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsIndexTableLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsIndexChartsLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsIndexManifestLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsCachesLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsSkinsLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SettingsSchemasLocation,
    exact: true,
    component: SettingsView,
  },
  {
    path: SupportLocation,
    exact: true,
    component: SupportView,
  },
  {
    path: SupportContactUsLocation,
    exact: true,
    component: SupportView,
  },
  {
    path: SupportDocumentationLocation,
    exact: true,
    component: SupportView,
  },
  {
    path: SupportHotKeysLocation,
    exact: true,
    component: SupportView,
  },
  {
    path: SupportLicensingLocation,
    exact: true,
    component: SupportView,
  },
  {
    path: SupportAboutUsLocation,
    exact: true,
    component: SupportView,
  },
];

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

export const helpRoutes = [
  {
    route: RootLocation,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    route: DashboardLocation,
    helpText: 'The dashboard overview page gives you an overview of your holdings among other things.',
  },
  {
    route: DashboardAccountsLocation,
    helpText: 'View the transactional history of an account.',
  },
  {
    route: AccountRawLocation,
    helpText: 'View the raw transaction.',
  },
  {
    route: AccountTracesLocation,
    helpText: 'View the history of traces for the transaction.',
  },
  {
    route: AccountGasLocation,
    helpText: 'View the event history of an account.',
  },
  {
    route: AccountReconsLocation,
    helpText: 'View the reconciliation history of an account.',
  },
  {
    route: AccountFunctionsLocation,
    helpText: 'View the functional history of an account.',
  },
  {
    route: DashboardMonitorsLocation,
    helpText:
      'Monitors are named addresses that you have indicated are "of interest" and should be monitored by the scrapers.',
  },
  {
    route: DashboardCollectionsLocation,
    helpText: 'Collections allow you to group together multiple monitored addresses.',
  },
  {
    route: SettingsIndexesLocation,
    helpText: (
      <div>
        <p>View the contents of the TrueBlocks index cache.</p>
        <p>
          For more information on the process of extracting the index,
          <a target='_blank' href='https://github.com/TrueBlocks/trueblocks-docs/issues/12'>
            see here
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    route: SettingsIndexChartsLocation,
    helpText: 'Charts related to the index cache.',
  },
  {
    route: SettingsIndexManifestLocation,
    helpText: 'Charts related to the index cache.',
  },
  {
    route: SettingsIndexGridLocation,
    helpText: 'Grid view of the index cache.',
  },
  {
    route: SettingsIndexTableLocation,
    helpText: 'Table view of the index cache.',
  },
  {
    route: NamesLocation,
    helpText: 'Names are common or known addresses that have been given a name.',
  },
  {
    route: NamesAddressesLocation,
    helpText: 'Named addresses are a convenient way to keep track of human-readable names for addresses.',
  },
  {
    route: NamesTagsLocation,
    helpText: 'Tags are groupings used to collect together named addresses.',
  },
  {
    route: NamesFuncSigsLocation,
    helpText: 'The function signatures tab allows you to add/edit/delete four byte signatures.',
  },
  {
    route: NamesEventSigsLocation,
    helpText: 'The event signatures tab allows you to add/edit/delete event signatures.',
  },
  {
    route: NamesBlocksLocation,
    helpText:
      'The blocks tab allows you to name particular blocks such as notable smart contract deployments, hard forks, or other blocks.',
  },
  {
    route: ExplorerLocation,
    helpText: 'View the contents of the TrueBlocks index cache.',
  },
  {
    route: ExplorerBlocksLocation,
    helpText: 'View blockchain block details.',
  },
  {
    route: ExplorerTransactionsLocation,
    helpText: 'View blockchain transaction details.',
  },
  {
    route: ExplorerReceiptsLocation,
    helpText: 'View blockchain receipt details.',
  },
  {
    route: ExplorerLogsLocation,
    helpText: 'View blockchain log details.',
  },
  {
    route: ExplorerTracesLocation,
    helpText: 'View blockchain trace details.',
  },
  {
    route: SettingsLocation,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    route: SettingsScrapersLocation,
    helpText: 'This screen allows you to adjust the way TrueBlocks two scrapers work.',
  },
  {
    route: SettingsCachesLocation,
    helpText: 'View, edit, clean, recover space from the TrueBlocks caches.',
  },
  {
    route: SettingsSkinsLocation,
    helpText: 'Change the skin or them of the application.',
  },
  {
    route: SettingsSchemasLocation,
    helpText: 'View and edit the schemas for the various screens and tables.',
  },
  {
    route: SupportLocation,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    route: SupportContactUsLocation,
    helpText: 'Information on contacting TrueBlocks, LLC.',
  },
  {
    route: SupportDocumentationLocation,
    helpText: 'Links to various documentation sites.',
  },
  {
    route: SupportHotKeysLocation,
    helpText: 'A view of all the hot-keys for the program.',
  },
  {
    route: SupportLicensingLocation,
    helpText: 'Licensing information about the software.',
  },
  {
    route: SupportAboutUsLocation,
    helpText: 'A short history of TrueBlocks, LLC.',
  },
];
