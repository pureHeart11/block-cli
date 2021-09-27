/*页面级，表格 */
import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'antd';
import { FilterTable } from 'xxxpc-design';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import config from '@/common/config';

const API_URL = 'https://mockapi.xxx.la/mock/admin.weipaitang.com/sale/scene/rule/list?method=get';

let refreshPage;
const Index = () => {
  const filterSetting = {
    formFields: [
      {
        label: '姓名:',
        type: 'input',
        key: 'promoterId',
        placeholder: '张三'
      },
      {
        label: '性别:',
        type: 'select',
        option: [
          { value: '0', label: '不限' },
          { value: '1', label: '男' },
          { value: '2', label: '女' }
        ],
        key: 'sex'
      },
      {
        label: '日期选择:',
        type: 'datePicker',
        key: 'date',
        widthUnit: 1.122
      },
      {
        type: 'selectGroup',
        option: [
          {
            value: '1',
            label: '男',
            option: [
              { value: '1-1', label: '老王' },
              { value: '1-2', label: '小头爸爸' }
            ]
          },
          {
            value: '2',
            label: '女',
            option: [{ value: '2-1', label: '围裙妈妈' }]
          }
        ],
        widthUnit: 0.9,
        key: 'green'
      }
    ],
    beforeSearchFunc: params => {
      console.log(params);
    }
  };
  const tableSetting = {
    batchBtnsJxs: [
      <Button type="primary" onClick={() => console.log('create')} key="creat">
        创建
      </Button>
    ],
    columnConfig: [
      {
        title: '头像',
        key: 'headImgUrl',
        dataIndex: 'headImgUrl',
        render: () => (
          <li>
            <img
              alt=""
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #E8E8E8',
                display: 'block'
              }}
              src="https://cdn01t.weipaitang.com/sky/common/houtaitp/image/20210519/88dd62328b6b422db9e7226c068a1b1b-W1366H768"
            />
          </li>
        )
      },
      { title: '昵称', key: 'nickname', dataIndex: 'nickname' },
      {
        title: '有匠号',
        key: 'yjId',
        dataIndex: 'yjId',
        render: text => {
          return text ?? '-';
        }
      },
      {
        title: '匠人等级',
        key: 'yjGrade',
        dataIndex: 'yjGrade',
        sorter: (a, b) => a.yjGrade - b.yjGrade,
        render: text => {
          if (text === '0') {
            return '-';
          }
        }
      },
      {
        title: '会员等级',
        key: 'memberGrade',
        dataIndex: 'memberGrade',
        render: text => {
          if (text === '0') {
            return '-';
          }
        }
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: () => <Badge color="#38BEA6" text="成功" />
      },
      {
        align: 'center',
        title: '操作',
        key: 'uri',
        dataIndex: 'uri',
        render: () => <a onClick={() => refreshPage()}>查看</a>
      }
    ],
    rowKey: 'id',
    getRefresh: refresh => {
      refreshPage = refresh;
    }
  };
  return (
    <PageHeaderLayout>
      <FilterTable filterSetting={filterSetting} tableSetting={tableSetting} apiUrl={API_URL} />
    </PageHeaderLayout>
  );
};

export default Index;
