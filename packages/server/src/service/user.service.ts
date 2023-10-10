import User from '../model/user.model';

// 传入 username password 创建用户
export const createUser = async (username: string, password: string) => {
  const res = await User.create({
    username,
    password,
  });
  return res.dataValues;
};

// 通过 username 获取用户信息
export const getUserInfo = async (username: string) => {
  const whereOpt = { username };
  const res = await User.findOne({
    attributes: ['id', 'username', 'password', 'is_admin'],
    where: whereOpt,
  });
  return res ? res.dataValues : null;
};
