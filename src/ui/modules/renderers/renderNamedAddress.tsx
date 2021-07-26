import React from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardAccountsAddressLocation } from '../../Routes';
import useGlobalState from '../../State';

export const renderNamedAddress = (name: string, address: string) => {
  const history = useHistory();
  const { setAccountAddress } = useGlobalState();
  return (
    <div>
      <div>{name === '' ? <div style={{ fontStyle: 'italic' }}>not named</div> : name}</div>
      <div
        style={{ color: '#1890ff', cursor: 'pointer' }}
        onClick={() => {
          setAccountAddress(address);
          history.push(DashboardAccountsAddressLocation(address));
        }}>
        {address}
      </div>
    </div>
  );
};
