import React from 'react';

import { getNames } from '@sdk';
import { ColumnsType } from 'antd/lib/table';

import { ResourceTable } from '@components/ResourceTable';
import {
  addActionsColumn, addColumn, TableActions,
} from '@components/Table';
import { useSdk } from '@hooks/useSdk';
import { Tag } from '@modules/types/Tag';

import { useGlobalState2 } from '../../../State';

export const Tags = () => {
  const { chain } = useGlobalState2();
  const dataCall = useSdk(() => getNames({
    chain,
    terms: [],
    tags: true,
  }));

  return (
    <ResourceTable
      resourceName='tags'
      call={dataCall}
      columns={tagSchema}
    />
  );
};

const tagSchema: ColumnsType<Tag> = [
  addColumn<Tag>({
    title: 'ID',
    dataIndex: 'tags',
  }),
  addActionsColumn<Tag>(
    {
      title: '',
      dataIndex: '',
    },
    {
      width: 150,
      getComponent: getTableActions,
    },
  ),
];

function getTableActions(item: Tag) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
