import { checklogin } from "../api/login";

export default () => {
  checklogin().then(function(res){
    localStorage.setItem('isLogin',res.data)
  })
  console.log(localStorage.getItem('isLogin'))
  return localStorage.getItem('isLogin')=='true';
};
