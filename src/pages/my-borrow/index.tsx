import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Card,
  Popconfirm,
  Breadcrumb,
  Message,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BORROW_FORM_PARAMS,
  BORROW_LIST,
  BORROW_LOADING,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import {
   myBorrow, returnBook,
} from '../../api/borrow';
import dayjs from 'dayjs';


function MyBorrow() {
  const dispatch = useDispatch();
  const columns = [
    {
      title: '书本编号',
      dataIndex: 'detailId',
    },
    {
      title: '书名',
      dataIndex: 'bookInfo.name',
    },
    {
      title: '作者',
      dataIndex: 'bookInfo.author',
    },
    {
      title: '价格',
      dataIndex: 'bookInfo.price',
    },
    {
      title: '出版社',
      dataIndex: 'bookInfo.publisher',
    },

    {
      title: '出版时间',
      dataIndex: 'bookInfo.publish',
      render: (_, record) => {
        return dayjs(record.bookInfo.publish).format('YYYY-MM-DD');
      },
    },

    {
      title: '操作',
      dataIndex: 'operations',
      render: (_,record) => (
        <div className={styles.operations}>

            <>
              <Popconfirm title="确定要归还该书?" 
              onOk={() => onReturn(record)}
              >
                <Button>归还</Button>
              </Popconfirm>
            </>
        </div>
      ),
    },
  ];

  const myBorrowState = useSelector((state: ReducerState) => state.myBorrow);

  const { data, loading } = myBorrowState;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(params = {}) {
    dispatch({ type: BORROW_LOADING, payload: { loading: true } });
    try {
      const postData = {
        ...params,
      };
      console.log(postData);
      const res: any = await myBorrow(postData);

      console.log(res);
      if (res) {
        dispatch({ type: BORROW_LIST, payload: { data: res.data } });
        dispatch({ type: BORROW_LOADING, payload: { loading: false } });
        dispatch({ type: BORROW_FORM_PARAMS, payload: { params } });
      }

    } catch (error) {}
  }
  async function onReturn(data) {
    dispatch({ type: BORROW_LOADING, payload: { loading: true } });
    const res: any = await returnBook(data);
    console.log(res)
    if (res) {
      dispatch({ type: BORROW_LOADING, payload: { loading: false } });
    }
    if(res.code==='200'){
      Message.success("归还成功！")
    }else{
      Message.error("归还失败："+res.message)
    }
    fetchData();
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>我的借阅</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <Table
          style={{ marginTop: 40 }}
          rowKey="detailId"
          loading={loading}
          // onChange={onChangeTable}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default MyBorrow;
