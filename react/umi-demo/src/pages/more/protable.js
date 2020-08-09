import React, { useState } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Input, Button } from 'antd';
import { connect } from 'umi';
import { getProductData } from '../../services/product';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default () => {
  const [keywords, setKeywords] = useState('中非');
  // console.log(keywords);
  const req = getProductData;
  return (
    <ProTable
      size="small"
      columns={columns}
      request={req}
      rowKey="name"
      params={{ keywords }}
      toolBarRender={action => [
        <Input.Search
          style={{
            width: 200,
          }}
          onSearch={value => {
            setKeywords(value);
          }}
        />,
      ]}
      pagination={{
        defaultCurrent: 1,
      }}
    />
  );
};
