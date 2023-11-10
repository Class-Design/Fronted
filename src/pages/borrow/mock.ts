import Mock from 'mockjs';

import setupMock from '../../utils/setupMock'

const data = {
  list: [
    {
      "bookId":"sadasd",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "status":1,
      'publish':"2021-12-01"
    },
    {
      "bookId":"sadasd1",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "status":0,
      'publish':"2021-12-01"
    },
    {
      "bookId":"sadasd2",
      "name":"test",
      "author":"test",
      "price":12.1,
      "publisher":"test",
      "status":1,
      'publish':"2021-12-01"
    }
  ]
}




setupMock({
  setup() {
    // Mock.mock(new RegExp('/api/v1/articles/edit'), (params) => {
    //   switch (params.type) {
    //     case 'GET':
    //       const { id } = qs.parseUrl(params.url).query;
    //       const detailData = data.list.filter(item => item._id === id);
    //       return {
    //         "msg": "文章详情获取成功",
    //         "data": detailData[0],
    //         "code": 0
    //       }
    //   }
    // });
    // Mock.mock(new RegExp('/api/v1/articles/collectStatus'), (params) => {
    //   switch (params.type) {
    //     case 'PUT':
    //       const body = JSON.parse(params.body);
    //       console.log('body',body); // isCollect

    //       data.list.map(item => {
    //         item.isCollect = body.isCollect;
    //         return item;
    //       })
    //       return {
    //         "msg": "一键操作成功",
    //         "data": null,
    //         "code": 0
    //       }
    //   }
    // });

    // Mock.mock(new RegExp('/api/v1/articles/status'), (params) => {
    //   switch (params.type) {
    //     case 'PUT':
    //       const body = JSON.parse(params.body);
    //       console.log('body',body);
          
    //       const index = data.list.findIndex(item => item._id === body.id);
    //       data.list[index] = { ...data.list[index], ...body };
    //       return {
    //         "msg": "文章状态修改成功",
    //         "data": null,
    //         "code": 0
    //       }
    //   }
    // });

    // Mock.mock(new RegExp('/api/v1/articles/publishStatus'), (params) => {
    //   switch (params.type) {
    //     case 'PUT':
    //       const body = JSON.parse(params.body);
    //       console.log('body',body);
          
    //       const index = data.list.findIndex(item => item._id === body.id);
    //       data.list[index] = { ...data.list[index], ...body };
    //       return {
    //         "msg": "文章发布状态修改成功",
    //         "data": null,
    //         "code": 0
    //       }
    //   }
    // });
    Mock.mock(new RegExp('/books/'))
    Mock.mock(new RegExp('/books'), (params) => {
      console.log('---', params);

      switch (params.type) {
        // case 'DELETE':
        //   const delBody = JSON.parse(params.body);
        //   const idx = data.list.findIndex(item => item._id === delBody.id);
        //   data.list.splice(idx, 1);
        //   return {
        //     "msg": "文章删除成功",
        //     "data": null,
        //     "code": 0
        //   }
        // case 'PUT':
        //   const body = JSON.parse(params.body);
        //   const index = data.list.findIndex(item => item._id === body.id);
        //   data.list[index] = { ...data.list[index], ...body };
        //   return {
        //     "msg": "文章修改成功",
        //     "data": body,
        //     "code": 0
        //   }
         
        // case 'POST':
        //   const postBody = JSON.parse(params.body);
        //   data.list.unshift(postBody);
        //   return {
        //     "msg": "文章添加成功",
        //     "code": 0,
        //     data: postBody
        //   }
        case 'GET':
        default:
          return {
            data: data.list,
          };
      }



    })
  },
});
