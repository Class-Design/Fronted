import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Form,

  Grid,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getBorrowList } from '../../api/book-manage';


function Categories() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const Row = Grid.Row;
  const Col = Grid.Col;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const columns = [
    {
      title: '书籍编号',
      dataIndex: 'bookInfo.bookId',
    },
    {
      title: '书本编号',
      dataIndex: 'detailId',
    },
    {
      title: '借阅人编号',
      dataIndex: 'userInfo.userId'
    },
    {
      title: '书籍名称',
      dataIndex: 'bookInfo.name',
    },
    {
      title: '借阅人姓名',
      dataIndex: 'userInfo.name',
    },
    {
      title: '借阅人班级',
      dataIndex: 'userInfo.classs',
    },
    {
      title: '借阅人地址',
      dataIndex: 'userInfo.location',
    },
    {
      title: '借阅人联系方式',
      dataIndex: 'userInfo.mobile',
    },
  ];
  const borrowManagerState = useSelector((state: ReducerState) => state.bookManage);

  const { data, loading } = borrowManagerState;

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
      const res: any = await getBorrowList(postData);

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

  async function onSearch() {
    const data = await form.getFields();
    fetchData(data);
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>图书管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
            <Form
               form={form}
               {...layout}
               style={{ marginBottom: 20 }}
               layout="horizontal"
            >
            <Row>
              <Col span={6}>
                <Form.Item field="bookId" label="书籍编号">
                  <Input placeholder="请输入书籍编号" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item field="userId" label="借阅人编号">
                  <Input placeholder="请输入借阅人编号" />
                </Form.Item>
              </Col>
              <Button onClick={onSearch} style={{ marginLeft: 20 }} type="primary">
                搜索
              </Button>
            </Row>
            </Form>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          data={data}
          className={styles['table-demo-editable-cell']}
        />
      </Card>
    </div>
  );
}

export default Categories;
