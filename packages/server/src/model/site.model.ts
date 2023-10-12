import { DataTypes, literal } from 'sequelize';
import { v4 } from 'uuid';
import seq from '../db/seq';
import User from './user.model';

const Site = seq.define(
  'site',
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      defaultValue: v4(),
      comment: '站点id 唯一',
      primaryKey: true,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '站点域名 唯一',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '网站名称',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '网站所属用户id',
    },
    option_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '网站配置id',
    },
  },
  { timestamps: true }
);

export const Option = seq.define('option', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: v4(),
    unique: true,
    comment: '配置id 唯一',
    primaryKey: true,
  },
  open: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    unique: false,
    comment: '是否开启监控',
  },
});

Option.belongsTo(Site, {
  foreignKey: 'id',
  targetKey: 'option_id',
  constraints: false,
});

Option.sync();

Site.sync();

export default Site;
