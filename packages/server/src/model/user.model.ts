import { DataTypes } from 'sequelize';
import seq from '../db/seq';

const User = seq.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否为管理员',
    },
  },
  {
    // 是否要生成时间戳
    timestamps: true,
  }
);

// 强制同步数据库（创建数据表）
// User.sync({ force: true });

export default User;
