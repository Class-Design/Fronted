import Mock from 'mockjs';
import setupMock from '../../utils/setupMock';

let list = [
  {
    'userDetail':{
        'userId':"asdasd",
        'classs':'test',
        'name':'he',
        'sex':'男',
        'location':'add',
        'mobile':'98',
        'age':18

    },
    'authority':{
      'userId':"asdasd",
      'authority':3
    }
  },
  {
    'userDetail':{
        'userId':"asdasd1",
        'classs':'test',
        'name':'he',
        'sex':'男',
        'location':'add',
        'mobile':'98',
        'age':18

    },
    'authority':{
      'userId':"asdasd1",
      'authority':3
    }
  }
];



setupMock({
  setup() {
    Mock.mock(new RegExp('/user/getList'), (params) => {
      console.log('---', params);

      switch (params.type) {
        // case 'DELETE':
        //   const delBody = JSON.parse(params.body);
        //   const idx = data.list.findIndex(item => item._id === delBody._id);
        //   data.list.splice(idx, 1);
        //   return {
        //     "msg": "用户删除成功",
        //     "data": null,
        //     "code": 0
        //   }
        case 'GET':
        default:
          return {
            data:list
          };
      }



    });
  },
});
