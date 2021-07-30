import { DashboardAccountsHistoryLocation } from '../../../../../Routes';
import useGlobalState, { useGlobalNames } from '../../../../../State';
import { chartColors } from '../../../../../Utilities';
import { AccountViewParams } from '../../../Dashboard';
import { MyAreaChart } from '@components/MyAreaChart';
import { addColumn } from '@components/Table';
import { AssetHistory } from '@modules/types';
import dayjs from 'dayjs';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Assets = ({ params }: { params: AccountViewParams }) => {
  const { uniqAssets } = params;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
      {uniqAssets.map((asset: any, index: number) => {
        const color =
          asset.assetSymbol === 'ETH'
            ? '#63b598'
            : chartColors[Number('0x' + asset.assetAddr.substr(2, 6)) % chartColors.length];

        const columns: any[] = [
          addColumn({
            title: 'Date',
            dataIndex: 'date',
          }),
          addColumn({
            title: asset.assetAddr,
            dataIndex: asset.assetAddr,
          }),
        ];

        const items = asset.balHistory.map((item: any) => {
          return {
            date: dayjs(item.date).format('YYYY-MM-DD'),
            [asset.assetAddr]: parseFloat(item.balance || 0),
          };
        });

        return (
          <MyAreaChart
            items={items}
            columns={columns}
            key={asset.assetAddr}
            index={asset.assetAddr}
            title={<ChartTitle asset={asset} index={index} />}
            table={false}
            color={color}
          />
        );
      })}
    </div>
  );
};

const ChartTitle = ({ index, asset }: { asset: AssetHistory; index: number }) => {
  const { names } = useGlobalNames();
  const { accountAddress } = useGlobalState();

  const links: any = [];
  links.push(<NavLink to={DashboardAccountsHistoryLocation}>History</NavLink>);
  if (!names[asset.assetAddr]) {
    links.push(
      <a target='_blank' href={'http://localhost:8080/names?autoname=' + asset.assetAddr}>
        Name
      </a>
    );
  }
  if (asset.assetSymbol !== 'ETH') {
    links.push(
      <a target='_blank' href={'https://etherscan.io/token/' + asset.assetAddr + '?a=' + accountAddress}>
        Holdings
      </a>
    );
  }
  links.push(
    <a target='_blank' href={'https://etherscan.io/address/' + asset.assetAddr}>
      Token
    </a>
  );
  links.push(
    <a target='_blank' href={'https://info.uniswap.org/#/tokens/' + asset.assetAddr}>
      Uniswap
    </a>
  );

  return (
    <div key={index + 'd1'} style={{ overflowX: 'hidden' }}>
      {asset.assetSymbol === 'ETH'
        ? asset.assetSymbol
        : names[asset.assetAddr]
        ? names[asset.assetAddr].name?.substr(0, 15) +
          (asset.assetSymbol ? ' (' + asset.assetSymbol.substr(0, 15) + ')' : '')
        : asset.assetSymbol.substr(0, 15)}
      <br />
      <small>
        ({asset.balHistory.length} txs){' '}
        <small>
          {links.map((link: any, index: number) => {
            return (
              <div key={index} style={{ display: 'inline' }}>
                [{link}]{' '}
              </div>
            );
          })}
        </small>
      </small>
    </div>
  );
};
