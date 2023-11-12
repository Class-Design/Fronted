import Mock from 'mockjs';
import setupMock from '../../utils/setupMock';


const data = {
  list: [
    {
      "bookId":"sadasd",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "reserve":1,
      'publish':"2021-12-01"
    },
    {
      "bookId":"sadasd1",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "reserve":0,
      'publish':"2021-12-01"
    },
    {
      "bookId":"sadasd2",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "reserve":1,
      'publish':"2021-12-01"
    }
  ],
  detail:[
    {
      'bookId':'sadasd',
      'detailId':'asdasd',
      'status':1,
      'remark':'可借阅'
    },
    {
      'bookId':'sadasd',
      'detailId':'asfdasd',
      'status':0,
      'remark':'不可借阅'
    },
    {
      'bookId':'sadasd',
      'detailId':'asdasdd',
      'status':0,
      'remark':'损坏'
    }
  ]
}

setupMock({
  setup() {
    Mock.mock(new RegExp('/books/detail'), (params) => {
      switch (params.type) {
        case 'GET':
          return {
            data:data.detail
          }
      }
    });
    Mock.mock(new RegExp('/book-manage'), (params) => {
      console.log('---', params);

      switch (params.type) {
        // case 'DELETE':
        //   const delBody = JSON.parse(params.body);
        //   const idx = data.list.findIndex(item => item._id === delBody._id);
        //   data.list.splice(idx, 1);
        //   return {
        //     "msg": "分类删除成功",
        //     "data": null,
        //     "code": 0
        //   }
        // case 'PUT':
        //   const body = JSON.parse(params.body);
        //   const index = data.list.findIndex(item => item._id === body._id);
        //   data.list[index] = { ...data.list[index], ...body };
        //   return {
        //     "msg": "分类修改成功",
        //     "data": null,
        //     "code": 0
        //   }
        // case 'POST':
        //   const { name } = JSON.parse(params.body);
        //   const returnData = Mock.mock({
        //     '_id|8': /[A-Z][a-z][-][0-9]/,
        //     name,
        //     articleNum: 0,
        //     createTime: Random.datetime(),
        //     updateTime: Random.datetime(),
        //   })

        //   data.list.unshift(returnData);
        //   return {
        //     "msg": "分类添加成功",
        //     "code": 0,
        //     data: returnData
        //   }
        case 'GET':
        default:

          return {
            data: data.list
          };
      }



    });
  },
});
