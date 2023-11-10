import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Message,
  Modal,
  Form,
  Select,
  InputNumber,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, updateDetail } from '../../api/user';

function Categories() {
  const FormItem = Form.Item;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [title, setTitle] = useState('编辑用户');
  const title="编辑用户"
  const [visible, setVisible] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const columns = [
    {
      title: '用户编号',
      dataIndex: 'userDetail.userId',
    },
    {
      title: '姓名',
      dataIndex: 'userDetail.name',
    },
    {
      title: '班级',
      dataIndex: 'userDetail.classs',
    },
    {
      title: '性别',
      dataIndex: 'userDetail.sex',
    },
    {
      title: '年龄',
      dataIndex: 'userDetail.age',
    },

    {
      title: '住址',
      dataIndex: 'userDetail.location',
    },
    {
      title: '邮箱',
      dataIndex: 'userDetail.mobile',
    },
    {
      title: '权限等级',
      dataIndex: 'authority.authority',
    },

    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button type="secondary" status="default" size="small" onClick={() => onUpdate(record)}>
            {"编辑"}
          </Button>
        </div>
      ),
    },
  ];

  const userState = useSelector((state: ReducerState) => state.user);

  const { data, loading } = userState;

  useEffect(() => {
    fetchData();
  }, []);
  const onOK = async () => {
    await form.validate();
    const data = form.getFields();
    setConfirmLoading(true)
    const res: any = await updateDetail(data);
    if (res.code === '200') {
      setConfirmLoading(false);
      Message.success('修改成功！');
    } else {
      Message.success('修改失败：' + res.message);
    }
    setVisible(false)
    fetchData()
  }
  async function fetchData(params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        ...params,
      };
      console.log(postData);
      const res: any = await getList(postData);
      console.log(res);
      if (res) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data } });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) { }
  }
  function onUpdate(row) {
    setVisible(true)
    form.setFieldsValue(row);
  };

  // const onDelete = async (row) => {
  //   const res: any = await remove(row);
  //   if (res.code === 0) {
  //     Message.success(res.msg);
  //     fetchData();
  //   } else {
  //     Message.error('删除失败，请重试！');
  //   }
  // };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          data={data}
        />
        <Modal
          title={<div style={{ textAlign: 'left' }}> {title} </div>}
          visible={visible}
          onOk={onOK}
          confirmLoading={confirmLoading}
          onCancel={() => {
            setVisible(false)
          }}
        >
          <Form {...formItemLayout} form={form}>
            {title === "编辑用户" ?
              <FormItem
                label="用户编号"
                field="userDetail.userId"
                disabled
              >
                <Input />
              </FormItem> : <div></div>
            }
            <FormItem
              label="姓名"
              field="userDetail.name"
              rules={[{ required: true, message: '请输入用户姓名' }]}
            >
              <Input placeholder="请输入用户姓名" />
            </FormItem>
            <FormItem
              label="班级"
              field="userDetail.classs"
              rules={[{ required: true, message: '请输入用户班级' }]}
            >
              <Input placeholder="请输入用户班级" />
            </FormItem>
            <FormItem
              label="性别"
              field="userDetail.sex"
              rules={[{ required: true, message: '请选择用户性别' }]}
            >
              <Select placeholder="请选择用户性别">
                {[
                  {
                    key: '男',
                    value: '男',
                  },
                  {
                    key: '女',
                    value: '女',
                  },
                  // ...categoriesArr,
                ].map((item) => (
                  <Select.Option key={item.key} value={item.value}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="年龄"
              field="userDetail.age"
              rules={[{ required: true, message: '请输入用户年龄' }]}
            >
              <InputNumber placeholder="请输入用户年龄" />
            </FormItem>
            <FormItem
              label="住址"
              field="userDetail.location"
              rules={[{ required: true, message: '请输入用户住址' }]}
            >
              <Input placeholder="请输入用户住址" />
            </FormItem>
            <FormItem
              label="邮箱"
              field="userDetail.mobile"
              rules={[
                { required: true, message: '请输入用户邮箱' },
                { match:/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/,message:'请输入正确的邮箱'}
            ]}
            >
              <Input placeholder="请输入用户邮箱" />
            </FormItem>
            <FormItem
              label="权限等级"
              field="authority.authority"
              rules={[{ required: true, message: '请选择权限等级' }]}
            >
              <Select placeholder="请选择权限等级">
                {[
                  {
                    key: '1',
                    value: 1,
                  },
                  {
                    key: '2',
                    value: 2,
                  },
                  {
                    key: '3',
                    value: 3,
                  },
                  // ...categoriesArr,
                ].map((item) => (
                  <Select.Option key={item.key} value={item.value}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Categories;
