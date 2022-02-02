import React from 'react';
import { createUseStyles } from 'react-jss';

import {
  DownOutlined,
} from '@ant-design/icons';
import {
  Dropdown, Menu, message, Progress,
} from 'antd';

import { useGlobalNames, useGlobalState } from '../../../../../State';
import { AccountViewParams } from '../../../Dashboard';

export const AddressBar = ({ params }: { params: AccountViewParams }) => {
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
        {namesMap.get(currentAddress)?.name}
      </h3>
      <div />
      <div>
        <ProgressBar params={params} />
      </div>
      <div />
    </div>
  );
};

const ProgressBar = ({ params }: { params: AccountViewParams }): JSX.Element => {
  const { theData, totalRecords } = params;
  if (!theData) return <></>;
  if (!totalRecords) return <></>;
  if (theData.length === totalRecords) return <></>;
  const done = (totalRecords - theData.length) === 1; // for some reason, it's off by one
  if (done) return <></>;

  const pct = Math.floor((theData.length / (totalRecords || 1)) * 100);
  return (
    <div>
      <Progress style={{ display: 'inline' }} percent={pct} strokeLinecap='square' />
    </div>
  );
};
