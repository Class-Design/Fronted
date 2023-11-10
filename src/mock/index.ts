import Mock from 'mockjs';

import './user';
import './message-box';
import '../pages/book-manage/mock';
import '../pages/borrow/mock';
import '../pages/my-borrow/mock';
import '../pages/user/mock';

Mock.setup({
  timeout: '200-600',
});