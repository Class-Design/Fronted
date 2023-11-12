import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Card,
  Form,
  Popconfirm,
  Select,
  Breadcrumb,
  DatePicker,
  Grid,
  Message,
  Popover,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import {
  borrow,
  getList,
  reserveBook,
} from '../../api/borrow';
import dayjs from 'dayjs';
import { get } from '../../api/publisher';
const Row = Grid.Row;
const Col = Grid.Col;

function Borrow() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [content, setContent] = useState("暂无信息")
  const [publisherName, setName] = useState("暂无信息")
  const columns = [
    {
      title: '编号',
      dataIndex: 'bookId',
      disabled: true
    },
    {
      title: '书名',
      dataIndex: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '价格',
      dataIndex: 'price',
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
      title: '订阅状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <div style={{
            color: record.status === 0 ? 'red' : 'green'
          }}>
            {record.status === 0 ? "不可借阅" : "可借阅"}
          </div>
        );
      },
    },

    {
      title: '出版时间',
      dataIndex: 'publish',
      render: (_, record) => {
        return dayjs(record.publish).format('YYYY-MM-DD');
      },
    },

    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>

          {record.status === 1 && (
            <>
              <Popconfirm title="确定要借阅该书?"
                onOk={() => onBorrow(record)}
              >
                <Button>
                  借阅
                </Button>
              </Popconfirm>
            </>
          )}
          {record.status === 0 && (
            <>
              <Popconfirm title="确定要预定该书?"
                onOk={() => onReserve(record)}
              >
                <Button>
                  预定
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const borrowState = useSelector((state: ReducerState) => state.borrow);

  const { data, loading } = borrowState;

  useEffect(() => {
    fetchData();
  }, []);
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
  async function onReserve(data) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    const res: any = await reserveBook(data)
    console.log(res);
    if (res) {
      dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
    }
    if (res.code == '200') {
      Message.success("预定成功")
    } else {
      Message.error("预定失败：" + res.message)
    }
    fetchData();
  }
  async function onBorrow(data) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    const res: any = await borrow(data)
    console.log(res);
    if (res) {
      dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
    }
    if (res.code == '200') {
      Message.success("借阅成功")
    } else {
      Message.error("借阅失败：" + res.message)
    }
    fetchData();
  }


  const onReset = () => {
    form.resetFields();
    fetchData();
  };

  const onSearch = async () => {
    const values = await form.getFields();
    const postData = values;
    if (postData.publish) {
      postData.publishStartTime = postData.publish[0];
      postData.publishEndTime = postData.publish[1];
      delete postData.publish;
    }
    console.log('postData', postData);
    fetchData(postData);
  };


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>图书借阅</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <Form
          form={form}
          {...layout}
          style={{ marginBottom: 20 }}
          layout="horizontal"
        >
          <Row>
            <Col span={6}>
              <Form.Item field="name" label="书名">
                <Input placeholder="请输入书名" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="author" label="作者">
                <Input placeholder="请输入作者" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="publisher" label="出版社">
                <Input placeholder="请输入出版社" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item field="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  {[
                    {
                      key: 1,
                      value: 1,
                    },
                    {
                      key: 0,
                      value: 0,
                    },
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.value === 1 ? '可借阅' : '不可借阅'}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item field="publish" label="出版时间">
                <DatePicker.RangePicker showTime format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={5} offset={1}>
              <Form.Item>
                <Button onClick={onReset}>重置</Button>
                <Button onClick={onSearch} style={{ marginLeft: 20 }} type="primary">
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          rowKey="bookId"
          loading={loading}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default Borrow;
