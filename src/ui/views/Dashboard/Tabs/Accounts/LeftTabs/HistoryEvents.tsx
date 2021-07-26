import { LogentryArray, Transaction } from '@modules/types';
import { Card } from 'antd';
import React from 'react';
import { useAcctStyles } from '../AccountStyles';

//-----------------------------------------------------------------
export const HistoryEvents = ({ record }: { record: Transaction }) => {
  if (!record) return <></>;
  const key = record.blockNumber + '.' + record.transactionIndex;
  const styles = useAcctStyles();
  return (
    <div key={key} className={styles.container}>
      <div key={key} className={styles.cardHolder}>
        <Card
          key={key}
          className={styles.card}
          headStyle={{
            backgroundColor: 'lightgrey',
          }}
          hoverable={true}
          title={'Events'}>
          {showLogs(record?.receipt?.logs, key, true)}
          {showLogs(record?.receipt?.logs, key, false)}
        </Card>
      </div>
    </div>
  );
};

//-----------------------------------------------------------------
const showLogs = (logs: LogentryArray, key: string, relevant: boolean) => {
  if (!logs) return <></>;
  return logs.map((log, index) => {
    if ((relevant && !log.address) || (!relevant && log.address)) return <div key={key + index}></div>;
    return (
      <pre key={key + index}>
        [{index}
        {log.address ? '-' + log.logIndex : ''}]: {JSON.stringify(log, null, 2)}
      </pre>
    );
  });
};
