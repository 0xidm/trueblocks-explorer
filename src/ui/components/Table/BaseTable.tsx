import 'antd/dist/antd.css';
import Table, { ColumnsType } from 'antd/lib/table';
import Mousetrap from 'mousetrap';
import React, { useEffect, useState } from 'react';

export type SelectedRow = {
  curRow: number;
  curPage: number;
  pageSize: number;
};

type JsonResponse = Record<string, any>;

export const BaseTable = ({
  dataSource,
  columns,
  loading,
  extraData,
  expandRender = undefined,
  siderRender = undefined,
}: {
  dataSource: JsonResponse;
  columns: ColumnsType<any>;
  loading: boolean;
  extraData?: string;
  expandRender?: (row: any) => JSX.Element;
  siderRender?: (record: any, selectedRow: SelectedRow) => JSX.Element;
}) => {
  const [displayedRow, setDisplayedRow] = useState(dataSource ? dataSource[0] : {});
  const [curRow, setCurRow] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [keyedData, setKeyedData] = useState([{ key: 0 }]);

  const setRowNumber = (n: number) => {
    const num = Math.max(0, Math.min(dataSource.length - 1, n));
    setCurRow(num);
    setCurPage(Math.floor(num / pageSize) + 1);
  };

  Mousetrap.bind('up', () => setRowNumber(curRow - 1));
  Mousetrap.bind('down', () => setRowNumber(curRow + 1));
  Mousetrap.bind(['left', 'pageup'], () => setRowNumber(curRow - pageSize));
  Mousetrap.bind(['right', 'pagedown'], () => setRowNumber(curRow + pageSize));
  Mousetrap.bind('home', () => setRowNumber(0));
  Mousetrap.bind('end', () => setRowNumber(dataSource.length - 1));
  Mousetrap.bind('enter', () => {
    setIsExpanded(!isExpanded);
  });

  useEffect(() => {
    setKeyedData(
      dataSource
        ? dataSource.map((record: any, index: number) => {
            return {
              key: index,
              extraData: extraData,
              ...record,
            };
          })
        : []
    );
  }, [dataSource, extraData]);

  useEffect(() => {
    setDisplayedRow(keyedData[curRow]);
  }, [curRow, keyedData]);

  // clean up mouse control when we unmount
  useEffect(() => {
    return () => {
      Mousetrap.unbind(['up', 'down', 'pageup', 'pagedown', 'home', 'end', 'enter']);
    };
  }, []);

  const gridStyle = siderRender ? { display: 'grid', gridTemplateColumns: '30fr 1fr 12fr 1fr' } : {};
  const expandedRowRender =
    expandRender !== undefined ? expandRender : (row: any) => <pre>{JSON.stringify(row, null, 2)}</pre>;

  return (
    <div style={gridStyle}>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowNumber(record.key);
            },
            style: record.key === curRow ? { color: 'darkblue', backgroundColor: 'rgb(236, 235, 235)' } : {},
          };
        }}
        size='small'
        loading={loading}
        columns={columns}
        dataSource={keyedData}
        expandable={{
          expandedRowRender: expandedRowRender,
        }}
        pagination={{
          onChange: (page, newPageSize) => {
            if (newPageSize && newPageSize !== pageSize) {
              setPageSize(newPageSize);
              setRowNumber(0);
            }
          },
          pageSize: pageSize,
          current: curPage,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
      />
      <div></div>
      {siderRender ? siderRender(displayedRow, { curRow, curPage, pageSize }) : <></>}
      <div></div>
    </div>
  );
};
