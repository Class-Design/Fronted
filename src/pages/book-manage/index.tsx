import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Modal,
  Form,
  Message,
  DatePicker,
  InputNumber,
  Popover,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, update, addBook } from '../../api/book-manage';
import dayjs from 'dayjs';
import history from '../../history';
import { get } from '../../api/publisher';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function Categories() {
  const [content, setContent] = useState("暂无信息")
  const [publisherName, setName] = useState("暂无信息")
  const locale = useLocale();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('添加书籍');
  async function onHover(visible, record) {
    if (visible) {
      const data={'name':record.publisher}
      const res = await get(data)
      setName(record.publisher)
      setContent(res.data.mobile)
    }else{
      setName("暂无消息")
      setContent("暂无消息")
    }
  }
  const columns = [
    {
      title: '书籍编号',
      dataIndex: 'bookId',
    },
    {
      title: '书籍名称',
      dataIndex: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      render: (_, record: any) => {
        return (
          <Popover position='rt' title={publisherName} content={content} onVisibleChange={(visible) => onHover(visible, record)}>
            <div>{record.publisher}</div>
          </Popover>
        )
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '出版时间',
      dataIndex: 'publish',
      render: (_, record) => {
        return record.publish
          ? dayjs(record.publish).format('YYYY-MM-DD')
          : '-';
      },
    },
    {
      title: '书本总数',
      dataIndex: 'reserve',
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button type="secondary" size="small" status='success' onClick={() => onDetail(record.bookId)}>
            {"书本详情"}
          </Button>
          <Button type="secondary" status="default" size="small" onClick={() => onUpdate(record)}>
            {"编辑"}
          </Button>
        </div>
      ),
    },
  ];

  const bookManageState = useSelector((state: ReducerState) => state.bookManage);

  const { data, loading, visible, confirmLoading } = bookManageState;

  useEffect(() => {
    fetchData();
  }, []);

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
        // dispatch({
        //   type: UPDATE_PAGINATION,
        //   payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        // });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) { }
  }

  function onSearch(name) {
    fetchData({ 'name': name });
  }
  const onDetail = (bookId) => {
    history.push('/book-manage/detail?id=' + bookId);
  };
  const onAdd = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    setTitle("添加书籍")
  };
  const onUpdate = (row) => {
    console.log(row)
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    form.setFieldsValue(row);
    setTitle('编辑书籍');
  };
  const onCancel = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: false,
      },
    });
    form.resetFields();
  };
  const onOk = async (title) => {
    await form.validate();
      const data = form.getFields(); 
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: {
          confirmLoading: true,
        },
      });
    if (title === '添加书籍') {
      const res: any = await addBook(data);
      if (res.code === '200') {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false,
          },
        });
        Message.success('添加成功！');
      } else {
        Message.success('添加失败，请重试！');
      }
    }else if(title==='编辑书籍'){
      data.publish=dayjs(data.publish).format('YYYY-MM-DD')
      console.log(data.publish)
      const res: any = await update(data);
      console.log(res)
      if (res.code === '200') {
        dispatch({
          type: TOGGLE_CONFIRM_LOADING,
          payload: {
            confirmLoading: false,
          },
        });
        Message.success('编辑成功！');
      } else {
        Message.success('编辑失败：'+res.message);
      }
    }
    onCancel();
    fetchData();
  };

  // const onHandleSave = async (row) => {
  //   const res: any = await update(row);
  //   if (res.code === 0) {
  //     Message.success(res.msg);
  //     fetchData();
  //   } else {
  //     Message.error('修改失败，请重试！');
  //   }
  // };

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
        <Breadcrumb.Item>图书管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加书籍
            </Button>
          </div>
          <div>
            {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入书籍名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}

          // columns={columns.map((column) =>
          //   column.editable
          //     ? {
          //         ...column,
          //         onCell: () => ({
          //           onHandleSave,
          //         }),
          //       }
          //     : column
          // )}
          columns={columns}
          data={data}
          className={styles['table-demo-editable-cell']}
        />

        <Modal
          title={<div style={{ textAlign: 'left' }}> {title} </div>}
          visible={visible}
          onOk={()=>onOk(title)}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            {title === "编辑书籍" ?
              <FormItem
                label="书籍编号"
                field="bookId"
                disabled
              >
                <Input />
              </FormItem> : <div></div>
            }
            <FormItem
              label="书籍名称"
              field="name"
              rules={[{ required: true, message: '请输入书籍名称' }]}
            >
              <Input placeholder="请输入书籍名称" />
            </FormItem>
            <FormItem
              label="作者"
              field="author"
              rules={[{ required: true, message: '请输入作者' }]}
            >
              <Input placeholder="请输入作者" />
            </FormItem>
            <FormItem
              label="出版社"
              field="publisher"
              rules={[{ required: true, message: '请输入出版社' }]}
            >
              <Input placeholder="请输入出版社" />
            </FormItem>
            <FormItem
              label="价格"
              field="price"
              rules={[
                { required: true, message: '请输入价格' },
                { match: /^[+-]?\d+(\.\d+)?$/, message: '请输入正确价格' }
              ]}
            >
              <Input placeholder="请输入价格" />
            </FormItem>
            {title === "添加书籍" ?
              <FormItem
                label="库存"
                field="reserve"
                rules={[{ required: true, message: '请输入库存量' }]}
              >
                <InputNumber placeholder="请输入库存" />
              </FormItem> : <div></div>
            }
            <FormItem
              label="出版时间"
              field="publish"
              rules={[{ required: true, message: '请输入出版时间' }]}
            >
              <DatePicker
                placeholder={"请选择出版时间"}
              />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Categories;
