export const userFormateError = {
  status: 400,
  message: '用户名或密码为空',
  result: '前端搞鉴权啊!!!(欧，我就是前端)',
};

export const userAlreadyExited = {
  status: 400,
  message: '用户已经存在',
  result: '',
};

export const findUserError = {
  status: 500,
  message: '查询用户失败',
  result: '',
};

export const userRegisterError = {
  status: 500,
  message: '用户注册失败',
  result: '',
};

export const userDoesNotExist = {
  status: 400,
  message: '用户不存在',
  result: '',
};

export const userLoginError = {
  status: 400,
  message: '用户密码错误',
  result: '',
};

export const tokenExpiredError = {
  code: 403,
  message: 'token已过期',
  result: '',
};
export const jsonWebTokenError = {
  code: 401,
  message: '无效的token',
  result: '',
};

export const siteInfoError = {
  code: 400,
  message: '站点信息不完整',
  result: '',
};

export const addSiteError = {
  code: 500,
  message: '添加站点失败',
  result: '',
};

export const findSiteError = {
  code: 500,
  message: '查询站点失败',
  result: '',
};

export const siteExistError = {
  code: 400,
  message: '站点已存在',
  result: '',
};
export const siteNotExistError = {
  code: 400,
  message: '站点不存在',
  result: '',
};

export const userInfoError = {
  code: 403,
  message: '不匹配的用户信息',
  result: '',
};

export const siteOptionNotExist = {
  code: 401,
  message: '站点配置不存在',
  result: '',
};

export const findSiteOptionError = {
  code: 500,
  message: '查询站点失败',
  result: '',
};
