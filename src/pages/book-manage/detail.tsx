import React, { useEffect, useState } from 'react';
import {
    Input,
    Breadcrumb,
    Card,
    Form,
    Message,
    Select,
    Button,
    Table,
    Modal,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import { queryDetail, updateDetail } from '../../api/book-manage';
import history from '../../history';
import { useLocation } from 'react-router-dom';

const Edit = () => {
    const FormItem = Form.Item;
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { search } = useLocation();
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
            title: '书籍编号',
            dataIndex: 'bookId',
        },
        {
            title: '书本编号',
            dataIndex: 'detailId',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (_, record) => (
                <div className={styles.operations}>
                    {record.status === 0 ? "不可借阅" : '可借阅'}
                </div>
            ),
        },
        {
            title: '详情',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    <Button type="secondary" status="default" size="small" onClick={() => onEdit(record)}>
                        {"编辑"}
                    </Button>
                </div>
            ),
        },
    ]
    let id = '';
    if (search) {
        id = search.split('id=')[1];
    }

    const loadData = async (isRefresh?: boolean) => {
        setLoading(true)
        if (!id) return;
        const res: any = await queryDetail(id);
        if (isRefresh) {
            Message.success('刷新成功');
        }
        const data = res.data;
        if (!data) return;
        setData(data)
        setLoading(false)
    };
    const onOK = async () => {
        await form.validate();
        const data = form.getFields();
        setConfirmLoading(true)
        const res: any = await updateDetail(data);
      if (res.code === '200') {
        setConfirmLoading(false);
        Message.success('修改成功！');
      } else {
        Message.success('修改失败：'+res.message);
      }
      setVisible(false)
      loadData();
    }
    useEffect(() => {
        loadData();
    }, []);
    const onReturn = () => {
        history.goBack();
    }
    const onEdit = (row) => {
        form.setFieldsValue(row);
        setVisible(true);
    }
    // const onRefresh = () => {
    //     loadData(true);
    // };


    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item >
                    <Button onClick={onReturn}>
                        图书管理
                    </Button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>书本详情</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    {/* <div>
          <Button onClick={onAdd} type="primary">
            添加书籍
          </Button>
        </div> */}
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    columns={columns}
                    data={data}
                    className={styles['table-demo-editable-cell']}
                />
                <Modal
                    title={<div style={{ textAlign: 'left' }}> 编辑书本 </div>}
                    visible={visible}
                    onOk={onOK}
                    confirmLoading={confirmLoading}
                    onCancel={() => {
                        setVisible(false)
                    }}
                >
                    <Form {...formItemLayout} form={form}>
                        <FormItem
                            label='书籍编号'
                            field='bookId'
                            disabled
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label='书本编号'
                            field='detailId'
                            disabled
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label='状态'
                            field='status'
                        >
                            <Select placeholder="请选择状态">
                                {[
                                    {
                                        key: 1,
                                        value: 1,
                                    },
                                    {
                                        key: 0,
                                        value: 0,
                                    },
                                    // ...categoriesArr,
                                ].map((item) => (
                                    <Select.Option key={item.key} value={item.value}>
                                        {item.value === 1 ? "可借阅" : "不可借阅"}
                                    </Select.Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem
                            label='详情'
                            field='remark'
                        >
                            <Input placeholder='请输入详情' />
                        </FormItem>
                    </Form>
                </Modal>
            </Card>

        </div>
    );
};

export default Edit;
