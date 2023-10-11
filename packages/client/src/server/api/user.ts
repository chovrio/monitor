import request from '..';

interface User {
  username: string;
  password: string;
}

// 注册接口
export const register = async (user: User) => {
  const res = await request.post({
    url: '/user/register',
    data: user,
    successMsg: '注册成功',
    errorMsg: '注册失败',
  });
  return res;
};

// 登录接口
export const login = async (user: User) => {
  const res = await request.post({
    url: '/user/login',
    data: user,
    successMsg: '登录成功',
    errorMsg: '账号或密码错误',
  });
  return res;
};
