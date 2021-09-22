/*页面级，表格 */
import React, { useState, useEffect } from 'react';
import { Tooltip, Icon, TimePicker, message } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { WForm } from 'wptpc-design';
import moment from 'moment';

const Index = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fields, setFields] = useState();

  // 表单配置
  const columns = [
    {
      title: '模块标题',
    },
    {
      name: 'userName',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名' }],
      onChange: (e) => console.log(e.target.value),
    },
    {
      name: 'number',
      label: '数字输入',
      type: 'inputNumber',
      min: 0,
      max: 100,
    },
    {
      name: 'email',
      label: '邮箱',
      rules: [
        {
          required: true,
          message: '请输入邮箱',
        },
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
    },

    {
      name: 'gender',
      label: '下拉',
      type: 'select',
      showSearch: true,
      rules: [{ required: true, message: '请选择类别' }],
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' },
      ],
      onChange: () => {
        setFields({ category: void 0 });
      },
    },
    {
      name: 'category',
      label: '下拉多选',
      type: 'select',
      mode: 'multiple',
      rules: [{ required: true, message: '请选择' }],
      options: [
        { value: '1', label: '名家' },
        { value: '2', label: '众筹' },
        { value: '3', label: '直播' },
        { value: '4', label: '捡漏' },
        { value: '5', label: '品牌馆' },
        { value: '6', label: '拍卖行' },
        { value: '7', label: '玩家社区' },
        { value: '8', label: '合买' },
      ],
    },
    {
      name: 'cascader',
      label: '级联',
      type: 'cascader',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
      // formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: '模块标题',
    },
    {
      name: 'checkbox',
      label: '多选框',
      type: 'checkbox',
      options: [
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Pear',
          value: 'pear',
          disabled: true,
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ],
      rules: [{ required: true, message: '请选择' }],
    },
    {
      name: 'radio',
      label: '单选框',
      type: 'radio',
      options: [
        {
          label: 'Apple',
          value: 'apple',
          disabled: true,
        },
        {
          label: 'Pear',
          value: 'pear',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ],
      rules: [{ required: true, message: '请选择' }],
    },
    {
      name: 'isOpen',
      label: '开关',
      type: 'switch',
    },
    {
      name: 'password',
      label: (
        <span>
          密码
          <Tooltip title="这是密码?">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      ),
      type: 'password',
      rules: [{ required: true, message: '请输入密码' }],
    },
    {
      name: 'rate',
      label: '星级',
      type: 'rate',
    },
    {
      name: 'textarea',
      label: '文本域',
      type: 'textarea',
      maxLength: 10,
      showCount: true,
      rows: 5, //默认为3
      rules: [{ required: true, message: '请输入文本域' }],
    },

    {
      name: 'date',
      label: '日期',
      type: 'datePicker',
      // format: 'YYYY-MM-DD',
      // showTime: true,
      rules: [{ required: true, message: '请选择日期' }],
    },
    {
      name: 'dateRange',
      label: '日期范围',
      type: 'rangePicker',
      rules: [{ required: true, message: '请选择日期' }],
    },
    {
      name: 'customCom',
      label: '自定义组件',
      type: 'customCom',
      com: <TimePicker />,
    },
    {
      name: 'treeSelect',
      label: '树选择',
      type: 'treeSelect',
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
        },
      ],
    },
    {
      name: 'fileList',
      label: '上传',
      type: 'commonUpload',
      multiple: true,
      rules: [{ required: true, message: '请上传文件' }],
    },
    {
      name: 'sortFileList',
      label: '上传拖拽',
      type: 'sortUpload',
      multiple: true,
      // rules: [{ required: true, message: '请上传文件' }]
    },
    {
      name: 'agree',
      label: '',
      type: 'checkbox',
      options: [
        {
          value: 1,
          label: '是否需要邮件接收下载通知',
        },
      ],
    },
  ];

  const getFormData = (v) => {
    console.log('收取表单的值: ', v);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      message.success('提交成功！');
    }, 3000);
  };

  return (
    <PageHeaderLayout>
      <WForm
        onCancel={() => {
          console.log('取消取消');
        }}
        onOk={(v) => {
          getFormData(v);
        }}
        confirmLoading={confirmLoading}
        formProps={{
          columns,
          fields, //改动表单的值，同form.setFieldsValue
          data: {
            userName: 'lyq',
            site: 'www.baidu',
            number: 99,
            password: '123456',
            checkbox: ['apple', 'orange'],
            radio: 'pear',
            gender: '1',
            category: ['3'],
            fileList:
              'https://cdn01t.weipaitang.com/sky/common/houtaitp/image/20210519/88dd62328b6b422db9e7226c068a1b1b-W1366H768,https://cdn01t.weipaitang.com/sky/common/houtaitp/image/20210519/7d1993706a69480691748acf195c1756-W2636H4334',
            isOpen: true,
            rate: 3,
            customCom: moment('10:10:12', 'HH:mm:ss'),
            treeSelect: '0-0-2',
          },
        }}
      />
    </PageHeaderLayout>
  );
};

export default Index;
