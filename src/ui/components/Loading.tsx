import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Loading = ({ children, loading }: { children: ReactNode, loading: boolean }) => (
  <Spin
    indicator={loadingIcon}
    spinning={loading}
  >
    {children}
  </Spin>
);