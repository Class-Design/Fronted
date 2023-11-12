import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Card,
  Form,
  Select,
  Breadcrumb,
  Space,
  InputNumber,
  Modal,
  Message,
} from '@arco-design/web-react';

import styles from './style/index.module.less';
import { IconEmail, IconGift, IconLocation, IconMan, IconRobot, IconStamp } from '@arco-design/web-react/icon';
import { getInfo } from '../../api/user';
import { updateDetail } from '../../api/user';
import history from '../../history';

function Info() {
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);
  const [visible, setVisible] = useState(false)
  async function fetchData() {
    try {
      const res: any = await getInfo();
      form.setFieldsValue(res.data)
      console.log(res);
    } catch (error) { }
  }
  async function changeName() {
    const res=await getInfo();
    localStorage.setItem('name', res.data.userDetail.name);
    window.location.href = history.createHref({
      pathname: '/borrow',
    });
  }
  const [confirmLoading,setConfirmLoading]=useState(false)
  async function onOk() {
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
    changeName()
    onCancel()
    fetchData()
  }
  // async function onReserve(data) {
  //   dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
  //   const res:any=await reserveBook(data)
  //   console.log(res);
  //   if (res) {
  //     dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
  //   }
  //   if(res.code=='200'){
  //     Message.success("预定成功")
  //   }else{
  //     Message.error("预定失败："+res.message)
  //   }
  //   fetchData();
  // }
  // async function onBorrow(data){
  //   dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
  //   const res:any=await borrow(data)
  //   console.log(res);
  //   if (res) {
  //     dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
  //   }
  //   if(res.code=='200'){
  //     Message.success("借阅成功")
  //   }else{
  //     Message.error("借阅失败："+res.message)
  //   }
  //   fetchData();
  // }


  const onCancel = () => {
    setVisible(false)
    form.resetFields();
  };
  const showModal = () => {
    setVisible(true)
  }
  return (
    <div className={styles.container} style={{ height: '100%' }}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>个人信息</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} style={{ paddingTop: '5%', height: '80%' }}>
        <Form className={styles.info_form} layout="vertical" form={form}>
          <Form.Item
            field="userDetail.name"
            rules={[
              { required: true, message: '请输入姓名' },
            ]}
            label="姓名"
          >
            <Input
              prefix={<IconRobot />}
              placeholder='请输入姓名'
            />
          </Form.Item>

          <Form.Item
            field="userDetail.classs"
            rules={[
              { required: true, message: '请输入班级' },
            ]}
            label="班级"
          >
            <Input
              prefix={<IconStamp />}
              placeholder='请输入班级'
            />
          </Form.Item>



          <Form.Item
            field="userDetail.age"
            label="年龄"
            rules={[
              { required: true, message: '请输入年龄' },
            ]}
          >
            <InputNumber
              prefix={<IconGift />}
              placeholder='请输入年龄'
            />
          </Form.Item>




          <Form.Item
            field="userDetail.sex"
            label="性别"
            rules={[
              { required: true, message: '请选择性别' },
            ]}
          >

            <Select
              prefix={<IconMan />}
              placeholder="请选择用户性别">
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
          </Form.Item>




          <Form.Item
            field="userDetail.location"
            label="地址"
            rules={[
              { required: true, message: '请输入地址' },
            ]}
          >
            <Input
              prefix={<IconLocation />}
              placeholder='请输入地址'
            />
          </Form.Item>


          <Form.Item
            field="userDetail.mobile"
            label="电子邮箱"
            rules={[
              { required: true, message: '请输入电子邮箱' },
              { match: /[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/, message: '请输入正确的邮箱' }
            ]}
          >
            <Input
              prefix={<IconEmail />}
              placeholder='请输入电子邮箱'
            />
          </Form.Item>

          <Space size={16} direction="vertical" style={{ margin: 'auto', width: '40%' }}>
            <Button type="primary" onClick={() => showModal()} long>
              确定
            </Button>
          </Space>
        </Form>
      </Card>
      <Modal
        title={<div style={{ textAlign: 'left' }}> 个人信息修改 </div>}
        visible={visible}
        onOk={() => onOk()}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <div>是否修改个人信息？</div>
      </Modal>
    </div>
  );
}

export default Info;