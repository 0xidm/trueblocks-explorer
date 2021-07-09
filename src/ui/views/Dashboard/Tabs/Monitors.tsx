import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { addActionsColumn, addColumn, addNumColumn, addTagsColumn, BaseTable, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { renderNamedAddress } from '@modules/renderers';
import { Monitor } from '@modules/types';
import { Button, Input, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useRef, useState } from 'react';
import useGlobalState from '../../../state';

export const Monitors = () => {
  const [monitors, loading] = useCommand('status', { mode: 'monitors', details: true });
  const [searchText, setSearchText] = useState('');
  const [_, setSearchedColumn] = useState('');
  const searchInputRef = useRef(null);
  const { namesEditModal, setNamesEditModal } = useGlobalState();
  const [selectedNameAddress, setSelectedNameAddress] = useState('');
  const [selectedNameName, setSelectedNameName] = useState('');
  const [selectedNameDescription, setSelectedNameDescription] = useState('');
  const [selectedNameSource, setSelectedNameSource] = useState('');
  const [selectedNameTags, setSelectedNameTags] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  if (monitors.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch monitors',
    });
  }

  const getData = useCallback((response) => {
    return response.status === 'fail' || !response.data[0].caches
      ? []
      : response.data[0].caches[0].items?.map((item: any, i: number) => {
          return {
            id: (i + 1).toString(),
            nameaddr: item.name + ' ' + item.address,
            ...item,
          };
        });
  }, []);

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const onEditItem = () => {
    setLoadingEdit(true);
    fetch(`${process.env.CORE_URL}/names`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        address: selectedNameAddress,
        description: selectedNameDescription,
        name: selectedNameName,
        source: selectedNameSource,
        tags: selectedNameTags,
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        /*let newAddresses = { ...addresses };
        //@ts-ignore
        let foundAddress = newAddresses.data.map((item) => item.address).indexOf(namesEditModal.address);
        //@ts-ignore
        newAddresses.data[foundAddress] = {
          //@ts-ignore
          ...newAddresses.data[foundAddress],
          description: selectedNameDescription,
          name: selectedNameName,
          source: selectedNameSource,
          tags: selectedNameTags,
        };
        setAddresses(newAddresses);*/
        setLoadingEdit(false);
        setNamesEditModal(false);
      });
  };

  return (
    <>
      <Modal visible={namesEditModal} onCancel={() => setNamesEditModal(false)} onOk={() => onEditItem()}>
        {loadingEdit ? (
          <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin />
          </div>
        ) : (
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '6px' }}>Address</div>
              <Input
                placeholder={'Address'}
                value={selectedNameAddress}
                onChange={(e) => setSelectedNameAddress(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '6px' }}>Name</div>
              <Input
                placeholder={'Name'}
                value={selectedNameName}
                onChange={(e) => setSelectedNameName(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '6px' }}>Description</div>
              <Input
                placeholder={'Description'}
                value={selectedNameDescription}
                onChange={(e) => setSelectedNameDescription(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '6px' }}>Source</div>
              <Input
                placeholder={'Source'}
                value={selectedNameSource}
                onChange={(e) => setSelectedNameSource(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '6px' }}>Tags</div>
              <Input
                placeholder={'Tags'}
                value={selectedNameTags}
                onChange={(e) => setSelectedNameTags(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
      <div
        onClick={() => setNamesEditModal(true)}
        style={{
          marginTop: '16px',
          marginBottom: '24px',
          color: 'rgb(24, 144, 255)',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '20px',
        }}>
        <PlusCircleFilled style={{ marginRight: '8px' }} />
        Add new monitor
      </div>
      <BaseTable
        dataSource={getData(monitors)}
        columns={monitorSchema.map((item) => {
          //@ts-ignore
          return { ...item, ...getColumnSearchProps(item.dataIndex) };
        })}
        loading={loading}
      />
    </>
  );
};

const monitorSchema: ColumnsType<Monitor> = [
  addColumn<Monitor>({
    title: 'Name / Address',
    dataIndex: 'nameaddr',
    configuration: {
      render: (unused, record) => renderNamedAddress(record),
      width: 500,
    },
  }),
  addTagsColumn(
    {
      title: 'Tags',
      dataIndex: 'tags',
      configuration: {
        ellipsis: false,
      },
    },
    (tag: string) => console.log('tag click', tag)
  ),
  addNumColumn<Monitor>({
    title: 'nAppearances',
    dataIndex: 'nApps',
    configuration: {
      sorter: {
        compare: (a, b) => a.nApps - b.nApps,
        multiple: 1,
      },
    },
  }),
  addNumColumn({
    title: 'firstAppearance',
    dataIndex: 'firstApp',
  }),
  addNumColumn({
    title: 'latestAppearance',
    dataIndex: 'latestApp',
  }),
  addNumColumn({
    title: 'sizeInBytes',
    dataIndex: 'sizeInBytes',
  }),
  addActionsColumn<Monitor>(
    {
      title: 'Actions',
      dataIndex: '',
      configuration: {
        align: 'left',
      },
    },
    {
      width: 150,
      getComponent: getTableActions,
    }
  ),
];

function getTableActions(item: Monitor) {
  const onClick = (action: string, item: Monitor) => {
    switch (action) {
      default:
        console.log('Clicked action', action, item.name);
    }
  };

  return <TableActions item={item} onClick={onClick} />;
}
