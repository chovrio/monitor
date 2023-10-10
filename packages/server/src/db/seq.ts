import { Sequelize } from 'sequelize';
import { MYSQL_DB, MYSQL_HOST, MYSQL_PWD, MYSQL_USER } from '../config';

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
});

seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    console.log('数据库连接失败', err);
  });

export default seq;
