import {
  DashboardAccountsChartsLocation,
  DashboardAccountsEventsLocation,
  DashboardAccountsFunctionsLocation,
  DashboardAccountsGasLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountsNeighborsLocation,
} from '../../../Routes';
import { useGlobalNames, useGlobalState } from '../../../State';
import { downloadRecords } from '../../../Utilities';
import { AccountViewParams } from '../Dashboard';
import { Charts } from './SubTabs/Charts';
import { Events } from './SubTabs/Events';
import { Functions } from './SubTabs/Functions';
import { Gas } from './SubTabs/Gas';
import { History } from './SubTabs/History';
import { Neighbors } from './SubTabs/Neighbors';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownCircleFilled,
  DownOutlined,
  RightCircleFilled,
  UpCircleFilled,
} from '@ant-design/icons';
import { BaseView, ViewTab } from '@components/BaseView';
import { addColumn } from '@components/Table';
import { Reconciliation, ReconciliationArray, Transaction } from '@modules/types';
import { Button, Checkbox, Divider, Dropdown, Menu, message, Progress, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React from 'react';
import { createUseStyles } from 'react-jss';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

export const DetailsView = ({ params }: { params: AccountViewParams }) => {
  const { theData, theMeta, uniqAssets, loading } = params;
  if (!theData || !uniqAssets) return <></>;

  const leftSideTabs: ViewTab[] = [
    {
      name: 'Charts',
      location: DashboardAccountsChartsLocation,
      component: <Charts params={params} />,
    },
    {
      name: 'History',
      location: DashboardAccountsHistoryLocation,
      component: <History params={params} />,
    },
    {
      name: 'Events',
      location: DashboardAccountsEventsLocation,
      component: <Events theData={theData} loading={loading} />,
    },
    {
      name: 'Functions',
      location: DashboardAccountsFunctionsLocation,
      component: <Functions theData={theData} loading={loading} />,
    },
    {
      name: 'Gas',
      location: DashboardAccountsGasLocation,
      component: <Gas theData={theData} loading={loading} />,
    },
    {
      name: 'Neighbors',
      location: DashboardAccountsNeighborsLocation,
      component: <Neighbors theData={theData} theMeta={theMeta} loading={loading} />,
    },
  ];

  return (
    <div>
      <AddressBar params={params} />
      <Divider style={{ height: '1px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '20fr 1fr' }}>
        <BaseView cookieName={'COOKIE_DASHBOARD_ACCOUNTS'} tabs={leftSideTabs} position='left' />
        <ViewOptions params={params} />
      </div>
    </div>
  );
};

const ViewOptions = ({ params }: { params: AccountViewParams }) => {
  const styles = useStyles();
  const { prefs, setTransactions } = params;

  const onEther = () => {
    prefs.setDenom('ether');
    setTransactions({ status: 'success' }); // empty
  };

  const onDollars = () => {
    prefs.setDenom('dollars');
    setTransactions({ status: 'success' }); // empty
  };

  const onHideZero = () => {
    prefs.setHideZero(prefs.hideZero === 'hide' ? 'all' : 'hide');
  };
  const onShowZero = () => {
    prefs.setHideZero(prefs.hideZero === 'show' ? 'all' : 'show');
  };
  const onShowAll = () => {
    prefs.setHideZero(prefs.hideZero === 'all' ? 'hide' : 'all');
  };

  const onExportCSV = () => {
    downloadRecords(params.theData, exportColumns, ',', '"');
  };

  const onExportTXT = () => {
    downloadRecords(params.theData, exportColumns, '\t', '');
  };

  const repOptions = ['by tx', 'by hour', 'by day', 'by week', 'by month', 'by quarter', 'by year'];
  return (
    <div style={{ marginLeft: '2px' }}>
      <h3 className={styles.smallHeader}>options: </h3>
      <div className={styles.smallHeader}>head: </div>
      <Checkbox checked={prefs.staging} onChange={() => prefs.setStaging(!prefs.staging)}>
        staging
      </Checkbox>
      <br />
      {/* TODO(tjayrush): should be unripe... */}
      <Checkbox checked={prefs.staging} onChange={() => prefs.setStaging(!prefs.staging)}>
        unripe
      </Checkbox>
      <p />
      <div className={styles.smallHeader}>display: </div>
      <Select
        placeholder='Inserted are removed'
        value={prefs.period}
        onChange={(newValue) => prefs.setPeriod(newValue)}
        style={{ width: '100%' }}>
        {repOptions.map((item, index) => {
          return (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          );
        })}
      </Select>
      <Checkbox checked={prefs.hideNamed} onChange={() => prefs.setHideNamed(!prefs.hideNamed)}>
        unnamed
      </Checkbox>
      <br />
      <Checkbox checked={prefs.hideReconciled} onChange={() => prefs.setHideReconciled(!prefs.hideReconciled)}>
        unreconciled
      </Checkbox>
      <br />
      <Checkbox checked={prefs.showDetails} onChange={() => prefs.setShowDetails(!prefs.showDetails)}>
        details
      </Checkbox>
      <p />
      <div className={styles.smallHeader}>zero balance: </div>
      <Checkbox checked={prefs.hideZero === 'hide'} onChange={() => onHideZero()}>
        hide
      </Checkbox>
      <br />
      <Checkbox checked={prefs.hideZero === 'show'} onChange={() => onShowZero()}>
        show
      </Checkbox>
      <br />
      <Checkbox checked={prefs.hideZero === 'all'} onChange={() => onShowAll()}>
        show all
      </Checkbox>
      <p />
      <div className={styles.smallHeader}>denomination: </div>
      <Checkbox checked={prefs.denom === 'ether'} onChange={() => onEther()}>
        ether
      </Checkbox>
      <br />
      <Checkbox checked={prefs.denom === 'dollars'} onChange={() => onDollars()}>
        dollars
      </Checkbox>
      <p />
      <div className={styles.smallHeader}>export: </div>
      <Button onClick={onExportCSV} className={styles.exportBtn}>
        CSV...
      </Button>
      <Button onClick={onExportTXT} className={styles.exportBtn}>
        TXT...
      </Button>
      <Button className={styles.exportBtn}>QB...</Button>
      {/* <br />
      <pre>{JSON.stringify(prefs, null, 2)}</pre> */}
    </div>
  );
};

const AssetSelector = ({ params }: { params: AccountViewParams }) => {
  const styles = useStyles();
  const { uniqAssets } = params;

  const onClick = ({ key }: { key: any }) => {
    message.info(`Click on item ${uniqAssets[key].assetAddr}`);
  };

  const menu = (
    <Menu onClick={onClick}>
      {uniqAssets.map((item, index) => {
        return <Menu.Item key={index}>{item.assetSymbol}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <>
      <div className={styles.smallHeader} style={{ display: 'inline' }}>
        asset:{' '}
        <Dropdown className='' overlay={menu} trigger={['click']}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            Filter <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </>
  );
};
/*
 import { Select } from 'antd';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

class SelectWithHiddenSelectedOptions extends React.Component {
  state = {
    selectedItems: [],
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    return (
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

ReactDOM.render(<SelectWithHiddenSelectedOptions />, mountNode);
*/

const ProgressBar = ({ params }: { params: AccountViewParams }): JSX.Element => {
  const { theData, totalRecords } = params;
  if (!theData) return <></>;
  if (!totalRecords) return <></>;
  if (theData.length === totalRecords) return <></>;
  const pct = Math.floor((theData.length / (totalRecords || 1)) * 100);
  return <Progress style={{ display: 'inline' }} percent={pct} strokeLinecap='square' />;
};

const AddressBar = ({ params }: { params: AccountViewParams }) => {
  const { currentAddress } = useGlobalState();
  const { namesMap } = useGlobalNames();

  if (!namesMap || !currentAddress) return <></>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 25fr 5fr 3fr 1fr' }}>
      <h3 style={{ marginTop: '2px' }}>
        Collection:
        <br />
        Address:
      </h3>
      <h3 style={{ display: 'inline', marginBottom: -5, backgroundColor: '#f2f2f2' }}>
        NONE
        <br />
        {currentAddress}
        <br />
        {namesMap[currentAddress]?.name}
      </h3>
      <div></div>
      <div>
        <ProgressBar params={params} />
        <AssetSelector params={params} />
      </div>
      <div></div>
    </div>
  );
};

export const renderAsNamedAddress = (address: string, acctFor: string) => {
  const { namesMap } = useGlobalNames();

  const isCurrent = address === acctFor;
  const isSpecial = address === '0xPrefund' || address === '0xBlockReward' || address === '0xUncleReward';

  let name = namesMap && namesMap[address] && namesMap[address].name;
  if (!isSpecial && !isCurrent && !name) {
    return <div style={{ color: 'grey' }}>{address}</div>;
  }

  let style = isCurrent ? { color: 'blue' } : { color: 'green' };
  if (isSpecial) {
    name = '';
    style = { color: 'green' };
  }

  const addr =
    name === '' || name === undefined
      ? address
      : '[' + address?.substr(0, 6) + '...' + address?.substr(address.length - 4, address.length) + '] ';
  return (
    <div style={style}>
      {addr}
      {name}
    </div>
  );
};

export const transactionSchema: ColumnsType<Transaction> = [
  addColumn({
    title: 'Date',
    dataIndex: 'date',
    configuration: {
      width: '15%',
      render: (field: any, record: Transaction) => {
        if (!record) return <div></div>;
        return (
          <pre>
            <div>{dayjs(record.date).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>{dayjs.unix(record.timestamp).fromNow()}</div>
            <div style={{ fontSize: 'small', fontStyle: 'italic' }}>
              {record.blockNumber?.toString() + '.' + record.transactionIndex?.toString()}
            </div>
          </pre>
        );
      },
    },
  }),
  addColumn({
    title: 'From / To',
    dataIndex: 'from',
    configuration: {
      width: '30%',
      render: (unused: any, record: Transaction) => {
        if (!record) return <div></div>;
        const to = record.to === record.extraData ? <div style={style}>{record.to}</div> : record.to;
        return (
          <>
            <pre>
              {renderAsNamedAddress(record.from, record.extraData)}
              {renderAsNamedAddress(record.to, record.extraData)}
              <div style={{ margin: '0px', padding: '0px', display: 'grid', gridTemplateColumns: '1fr 10fr' }}>
                {msgPills(record)}
                <div> </div>
              </div>
            </pre>
          </>
        );
      },
    },
  }),
  addColumn({
    title: 'Reconciliations (asset, beg, in, out, gasOut, end, check)',
    dataIndex: 'compressedTx',
    configuration: {
      width: '50%',
      render: (item, record) => {
        const st = useStyles();
        item = record.compressedTx;
        if (item === '' && record.from === '0xPrefund') item = '0xPrefund';
        if (item === '' && record.from === '0xBlockReward') item = '0xBlockReward';
        if (item === '' && record.from === '0xUncleReward') item = '0xUncleReward';
        return (
          <div style={{ border: '1px solid darkgrey' }}>
            <div className={st.reconHead}>{item}</div>
            <div>{renderStatements(record.statements)}</div>
          </div>
        );
      },
    },
  }),
  addColumn({
    title: '',
    dataIndex: 'statements',
    configuration: {
      width: '5%',
      render: (item, record, index) => (
        <a target='_blank' href={'http://etherscan.io/tx/' + record.hash}>
          ES
        </a>
      ),
    },
  }),
];

export const msgPills = (record: Transaction) => {
  const st = useStyles();
  const isErr = record.isError;
  const isInt = record.to != record.extraData && record.from != record.extraData;
  const isCon = record.to == '0x0';
  const is20 = record.toName?.is_erc20 || record?.statements?.length > 1;
  const is721 = record.toName?.is_erc721;
  const tag = (name: string, tag: string, show: boolean) => {
    return show ? <div className={st.tag + ' ' + tag}>{name}</div> : <></>;
  };
  return (
    <div style={{ display: 'flex' }}>
      {tag('int', st.intTag, isInt)}
      {tag('err', st.errTag, isErr)}
      {tag('con', st.conTag, isCon)}
      {tag('erc20', st.tok20Tag, is20 && !is721)}
      {tag('erc721', st.tok721Tag, is721)}
    </div>
  );
};

export const renderStatements = (statements: ReconciliationArray) => {
  const styles = useStyles();
  if (statements === null) return <></>;
  return (
    <table className={style.table}>
      <tbody>
        {statements?.map((statement, i) => {
          return (
            <Statement
              key={
                statement.blockNumber * 100000 + statement.transactionIndex + statement.assetSymbol ||
                `${i}-${Math.random()}`
              }
              statement={statement}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const ReconIcon = ({ statement }: { statement: Reconciliation }) => {
  if (!statement) return <></>;
  if (!statement.reconciliationType) {
    statement.reconciliationType = 'regular';
  }
  let icon = <></>;
  const okay = { color: 'green' };
  const not_okay = { color: 'red' };
  if (statement.reconciled) {
    icon = <></>;
    switch (statement.reconciliationType) {
      case 'partial-nextdiff':
        icon = <DownCircleFilled style={okay} />;
        break;
      case 'prevdiff-partial':
        icon = <UpCircleFilled style={okay} />;
        break;
      case 'partial-partial':
        icon = <RightCircleFilled style={okay} />;
        break;
      case 'regular':
      case 'by-trace':
        icon = <CheckCircleFilled style={okay} />;
        break;
    }
  } else {
    icon = <CloseCircleFilled style={not_okay} />;
  }
  return <div>{icon}</div>;
};

const Statement = ({ statement }: { statement: Reconciliation }) => {
  const styles = useStyles();
  return (
    <tr className={styles.row} key={statement.assetSymbol || Math.random()}>
      <td key={`${1}-${Math.random()}`} className={styles.col} style={{ width: '12%' }}>
        {statement.assetSymbol?.slice(0, 5)}
      </td>
      <td key={`${2}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(!statement.begBal ? '0.000000' : statement.begBal)}
      </td>
      <td key={`${3}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.totalIn)}
      </td>
      <td key={`${4}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.totalOutLessGas)}
      </td>
      <td key={`${5}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.gasCostOut, true)}
      </td>
      <td key={`${6}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(!statement.endBal ? '0.000000' : statement.endBal)}
      </td>
      <td key={`${7}-${Math.random()}`} className={styles.col} style={{ width: '4%' }}>
        <ReconIcon statement={statement} />
      </td>
    </tr>
  );
};

const clip = (num: string, is_gas?: boolean) => {
  if (!num) return <></>;
  const parts = num.split('.');
  if (parts.length === 0 || parts[0] === '')
    return (
      <div style={{ color: 'lightgrey' }}>
        {'0.000000'}
        {is_gas ? 'g' : ''}
      </div>
    );
  if (parts.length === 1)
    return (
      parts[0] +
      (
        <div>
          {'.000000'}
          {is_gas ? 'g' : ''}
        </div>
      )
    );
  return (
    <div>
      {parts[0] + '.' + parts[1].substr(0, 6)}
      {is_gas ? 'g' : ''}
    </div>
  );
};

const useStyles = createUseStyles({
  table: {},
  row: {},
  col: {
    textAlign: 'right',
    backgroundColor: '#fff7e6',
  },
  smallHeader: {
    fontWeight: 800,
    textDecoration: 'underline',
  },
  exportBtn: {
    margin: '0',
    padding: '1',
    paddingLeft: '8px',
    height: '30px',
    width: '70px',
    fontSize: '10pt',
    textAlign: 'left',
  },
  reconHead: {
    padding: '2px',
    paddingLeft: '5px',
    backgroundColor: 'lightgrey',
    color: '#222222',
    overflowX: 'hidden',
  },
  tag: {
    padding: '0px 2px 0px 2px',
    margin: '0px 0px 0px 2px',
    border: '1px solid red',
    borderRadius: '4px',
    fontSize: '9pt',
    textAlign: 'center',
  },
  errTag: {
    backgroundColor: 'lightcoral',
    borderColor: 'lightcoral',
    color: 'yellow',
  },
  intTag: {
    backgroundColor: 'slateblue',
    borderColor: 'slateblue',
    color: 'white',
  },
  conTag: {
    backgroundColor: 'cornsilk',
    borderColor: 'orange',
    color: 'black',
  },
  tok20Tag: {
    backgroundColor: 'darkblue',
    borderColor: 'darkblue',
    color: 'white',
  },
  tok721Tag: {
    backgroundColor: 'darkgreen',
    borderColor: 'darkgreen',
    color: 'white',
  },
});

//-----------------------------------------------------------------
export const useAcctStyles = createUseStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 28fr 3fr',
  },
  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '2px',
    padding: '4px',
  },
  card: {
    border: '1px solid lightgrey',
    width: '600px',
  },
  tableHead: {
    padding: '0px',
    margin: '0px',
    overflowX: 'hidden',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '+1',
    borderBottom: '1px solid lightgrey',
  },
  tableRow: {
    padding: '0px',
    margin: '0px',
    overflowX: 'hidden',
    textAlign: 'right',
  },
});

const exportColumns: ColumnsType<Transaction> = [
  addColumn({
    title: 'bn.txid',
    dataIndex: 'blockNumber',
    configuration: {
      render: (unused, record) => record.blockNumber + '.' + record.transactionIndex,
    },
  }),
  addColumn({
    title: 'Hash',
    dataIndex: 'hash',
  }),
  addColumn({
    title: 'From Address',
    dataIndex: 'from',
  }),
  addColumn({
    title: 'From Name',
    dataIndex: 'fromName',
    configuration: {
      render: (unused, record) => record.fromName.name,
    },
  }),
  addColumn({
    title: 'To Address',
    dataIndex: 'to',
  }),
  addColumn({
    title: 'To Name',
    dataIndex: 'toName',
    configuration: {
      render: (unused, record) => record.toName.name,
    },
  }),
];
