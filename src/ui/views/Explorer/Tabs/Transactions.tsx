import { Loading } from '@components/Loading';
import { useFetchData } from '@hooks/useFetchData';
import { createErrorNotification } from '@modules/error_notification';
import React from 'react';

export const Transactions = () => {
  const { theData, loading, status } = useFetchData('transactions', {
    transactions: '12001001.0',
    cache: true,
    articulate: true,
  });

  if (status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transaction',
    });
  }

  return (
    <Loading loading={loading}>
      <pre>{JSON.stringify(theData, null, 2)}</pre>
    </Loading>
  );
};
