/* eslint-disable react/require-default-props */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Skeleton } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import { useKeyNav } from '@hooks/useKeyNav';
import { handleSelectionScroll } from '@modules/scroll';

import 'antd/dist/antd.css';

type JsonResponse = Record<string, any>;

export const BaseTable = ({
  dataSource,
  streamSource,
  columns,
  loading,
  extraData,
  expandRender = undefined,
  defPageSize = 7,
  totalRecords,
  showRowPlaceholder = false,
  onSelectionChange = () => { },
  onPageChange = () => { },
}: {
  dataSource: JsonResponse;
  streamSource?: boolean,
  columns: ColumnsType<any>;
  loading: boolean;
  extraData?: string;
  expandRender?: (row: any) => JSX.Element;
  defPageSize?: number;
  totalRecords?: number,
  showRowPlaceholder?: boolean,
  onSelectionChange?: (row: unknown) => void,
  onPageChange?: ({ page, pageSize }: { page: number, pageSize: number }) => void,
}) => {
  const [pageSize] = useState(defPageSize);
  const tableRef = useRef<HTMLTableElement>(document.createElement('table'));
  const {
    onKeyDown,
    page,
    row,
    expandedRow,
    setExpandedRow,
    selectRow,
    setPosition,
  } = useKeyNav({
    stream: Boolean(streamSource),
    pageSize,
    maxItems: totalRecords || dataSource.length,
    handleScroll: (event: KeyboardEvent, rowNumber: number, size: number) => handleSelectionScroll({
      event, tableRef, rowNumber, pageSize: size,
    }),
  });
  const [keyedData, setKeyedData] = useState([{ key: 0 }]);

  useEffect(() => {
    onPageChange({ page, pageSize });
  }, [page, onPageChange, pageSize]);

  useEffect(() => {
    setKeyedData(
      dataSource
        ? dataSource.map((record: any, index: number) => {
          if (record.key !== undefined) console.log('BaseTable assigns the key field, data should not.');
          return {
            key: index,
            extraData,
            ...record,
          };
        })
        : [],
    );
  }, [dataSource, extraData]);

  const onKeyUp = () => onSelectionChange(keyedData[row]);

  // We will execute this effect only once, to notify the parent about
  // the default (first) item being selected when BaseTable mounts.
  const parentAlreadyNotified = useRef(false);
  useEffect(() => {
    if (parentAlreadyNotified.current) return;
    parentAlreadyNotified.current = true;
    onSelectionChange(keyedData[row]);
  });

  const expandedRowRender = expandRender !== undefined
    ? expandRender
    : (rowContent: any) => <pre>{JSON.stringify(rowContent, null, 2)}</pre>;

  const dataWithSkeletons = useMemo(() => {
    if (page === 1) {
      return keyedData;
    }

    const lastPage = Math.ceil(Number(totalRecords) / pageSize);
    const missingItems = (() => {
      // The last page of data can have less items than pageSize, but it will
      // always be modulo of totalRecords and pageSize
      if (page === lastPage) {
        const expectedItems = Number(totalRecords) % pageSize;
        return expectedItems - keyedData.length;
      }

      return pageSize - keyedData.length;
    })();

    if (missingItems === 0) return keyedData;

    return Array.from({ length: pageSize }, (v, index) => {
      if (keyedData[index] !== undefined) return keyedData[index];

      return {
        key: `skeleton-${index}`,
      };
    });
  }, [page, keyedData, pageSize, totalRecords]);

  const columnsWithSkeletons = useMemo(() => {
    if (keyedData.length >= pageSize) return columns;

    const skeletonRegexp = /skeleton-/;

    return columns.map((column) => ({
      ...column,
      // TODO: replace `any`when we fix typing for `columns`
      render(text: string, record: any, index: number) {
        if (!skeletonRegexp.test(record.key)) return column.render?.(text, record, index);

        return <Skeleton paragraph={{ rows: 3 }} title={false} active key={column.key} />;
      },
    }));
  }, [columns, keyedData.length, pageSize]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={tableRef} onKeyDown={onKeyDown} onKeyUp={onKeyUp} tabIndex={-1}>
      <Table
        onRow={(record, index) => ({
          onClick: () => {
            selectRow(index || 0);
          },
          style: record.key === row ? { color: 'darkblue', backgroundColor: 'rgb(236, 235, 235)' } : {},
        })}
        size='small'
        loading={loading}
        columns={showRowPlaceholder ? columnsWithSkeletons : columns}
        dataSource={showRowPlaceholder ? dataWithSkeletons : keyedData}
        expandable={{
          expandedRowRender,
          expandedRowKeys: [expandedRow],
          onExpand(expanded, record) {
            setExpandedRow(expanded ? record.key : -1);
            selectRow(record.key);
          },
        }}
        pagination={{
          onChange: (newPage, newPageSize) => {
            onPageChange({ page: newPage, pageSize: newPageSize || defPageSize });

            setPosition((newPage - 1) * pageSize);
          },
          total: totalRecords,
          pageSize,
          current: page,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
      />
    </div>
  );
};
