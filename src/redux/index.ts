import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import login, { UserLoginState } from '../pages/login/redux/reducer';
import bookManage, { BookManageState } from '../pages/book-manage/redux/reducer';
import user, { UserState } from '../pages/user/redux/reducer';
import borrow, { BorrowState } from '../pages/borrow/redux/reducer';
import myBorrow,{ MyBorrowState } from '../pages/my-borrow/redux/reducer';


export interface ReducerState {
  global: GlobalState;
  login: UserLoginState;
  bookManage: BookManageState;
  user: UserState;
  borrow: BorrowState;
  myBorrow:MyBorrowState;
}

export default combineReducers({
  global,
  login,
  bookManage,
  user,
  borrow,
  myBorrow,
});
