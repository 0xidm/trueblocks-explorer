import { SearchOutlined } from '@ant-design/icons';
import { addActionsColumn, addColumn, addFlagColumn, addTagsColumn, BaseTable, TableActions } from '@components/Table';
import { Result, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { createErrorNotification } from '@modules/error_notification';
import { renderClickableAddress } from '@modules/renderers';
import { Accountname } from '@modules/types';
import { Button, Input, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnsType } from 'antd/lib/table';
import { either as Either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../../State';

export const Names = () => {
  const [searchText, setSearchText] = useState('');
  const [_, setSearchedColumn] = useState('');
  const searchInputRef = useRef(null);
  const { namesEditModal, setNamesEditModal, setNamesEditModalVisible } = useGlobalState();
  const [selectedNameName, setSelectedNameName] = useState(namesEditModal.name);
  const [selectedNameDescription, setSelectedNameDescription] = useState(namesEditModal.description);
  const [selectedNameSource, setSelectedNameSource] = useState(namesEditModal.source);
  const [selectedNameTags, setSelectedNameTags] = useState(namesEditModal.tags);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState<Result>({ status: 'success', data: [], meta: {} });
  if (addresses.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch addresses',
    });
  }
  const getData = useCallback((response) => {
    if (response.status === 'fail') return [];
    return response.data?.map((item: any, i: number) => {
      return {
        id: (i + 1).toString(),
        searchStr: item.address + ' ' + item.name,
        ...item,
      };
    });
  }, []);
  const theData = getData(addresses);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const eitherResponse = await runCommand('names', {
        expand: true,
        all: true,
      });
      const result: Result = pipe(
        eitherResponse,
        Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
      );
      setLoading(false);
      setAddresses(result);
    })();
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
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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

  useEffect(() => {
    if (namesEditModal) {
      setSelectedNameName(namesEditModal.name);
      setSelectedNameDescription(namesEditModal.description);
      setSelectedNameSource(namesEditModal.source);
      setSelectedNameTags(namesEditModal.tags);
    }
  }, [namesEditModal]);

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
        address: namesEditModal.address,
        description: selectedNameDescription,
        name: selectedNameName,
        source: selectedNameSource,
        tags: selectedNameTags,
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        // TODO(tjayrush): Does this check for backend error?
        let newAddresses = { ...addresses };
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
        setAddresses(newAddresses);
        setLoadingEdit(false);
        setNamesEditModalVisible(false);
      });
  };

  return (
    <>
      <NameEditModal
        namesEditModal={namesEditModal}
        setNamesEditModal={setNamesEditModal}
        loadingEdit={loadingEdit}
        selectedNameName={selectedNameName}
        setSelectedNameName={setSelectedNameName}
        selectedNameDescription={selectedNameDescription}
        setSelectedNameDescription={setSelectedNameDescription}
        selectedNameSource={selectedNameSource}
        setSelectedNameSource={setSelectedNameSource}
        selectedNameTags={selectedNameTags}
        setSelectedNameTags={setSelectedNameTags}
        onEditItem={onEditItem}
      />
      <BaseTable
        dataSource={theData}
        columns={addressSchema.map((item) => {
          //@ts-ignore
          return { ...item, ...getColumnSearchProps(item.dataIndex) };
        })}
        loading={loading}
      />
    </>
  );
};

const NameEditModal = ({
  namesEditModal,
  setNamesEditModal,
  loadingEdit,
  selectedNameName,
  setSelectedNameName,
  selectedNameDescription,
  setSelectedNameDescription,
  selectedNameSource,
  setSelectedNameSource,
  selectedNameTags,
  setSelectedNameTags,
  onEditItem,
}: {
  namesEditModal: any;
  setNamesEditModal: any;
  loadingEdit: any;
  selectedNameName: any;
  setSelectedNameName: any;
  selectedNameDescription: any;
  setSelectedNameDescription: any;
  selectedNameSource: any;
  setSelectedNameSource: any;
  selectedNameTags: any;
  setSelectedNameTags: any;
  onEditItem: any;
}) => {
  const fields = [
    { name: 'Address', value: namesEditModal.address, type: '', onChange: setSelectedNameName, disabled: true },
    { name: 'Name', value: selectedNameName, type: '', onChange: setSelectedNameName },
    { name: 'Description', value: selectedNameDescription, type: '', onChange: setSelectedNameDescription },
    { name: 'Source', value: selectedNameSource, type: '', onChange: setSelectedNameSource },
    { name: 'Tags', value: selectedNameTags, type: '', onChange: setSelectedNameTags },
  ];

  return (
    <Modal visible={namesEditModal} onCancel={() => setNamesEditModal(false)} onOk={() => onEditItem()}>
      {loadingEdit ? (
        <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div style={{ marginTop: '24px' }}>
          <h2>Editing Name</h2>
          {fields.map((item: any, index: number) => {
            return (
              <ModalEditRow
                key={index}
                name={item.name}
                value={item.value}
                type={item.type}
                onChange={item.onChange}
                disabled={item.disabled}
              />
            );
          })}
        </div>
      )}
    </Modal>
  );
};

const ModalEditRow = ({
  name,
  value,
  type,
  onChange,
  disabled,
}: {
  name: any;
  value: any;
  type: any;
  onChange: any;
  disabled: any;
}) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ marginBottom: '6px' }}>{name}</div>
      <Input disabled={disabled} placeholder={name} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const addressSchema: ColumnsType<Accountname> = [
  addColumn<Accountname>({
    title: 'Name / Address',
    dataIndex: 'searchStr',
    configuration: {
      render: (unused, record) => renderClickableAddress(record.name, record.address),
      width: 500,
    },
  }),
  addColumn({
    title: 'Symbol',
    dataIndex: 'symbol',
  }),
  addColumn({
    title: 'Source',
    dataIndex: 'source',
  }),
  addColumn({
    title: 'Decimals',
    dataIndex: 'decimals',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
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
  addFlagColumn({
    title: 'Prefund',
    dataIndex: 'is_prefund',
  }),
  addFlagColumn({
    title: 'ERC20',
    dataIndex: 'is_erc20',
  }),
  addFlagColumn({
    title: 'ERC721',
    dataIndex: 'is_erc721',
  }),
  addFlagColumn({
    title: 'Contract',
    dataIndex: 'is_contract',
  }),
  addFlagColumn({
    title: 'Custom',
    dataIndex: 'is_custom',
  }),
  addFlagColumn({
    title: 'Monitor',
    dataIndex: 'mon',
  }),
  addActionsColumn<Accountname>(
    {
      title: '',
      dataIndex: '',
    },
    {
      width: 150,
      getComponent: getTableActions,
    }
  ),
];

function getTableActions(item: Accountname) {
  const { setNamesEditModal } = useGlobalState();
  return (
    <TableActions
      item={item}
      onClick={(action, tableItem) => {
        if (action === 'edit') {
          setNamesEditModal(tableItem);
        }
        console.log('Clicked action', action, tableItem);
      }}
    />
  );
}
