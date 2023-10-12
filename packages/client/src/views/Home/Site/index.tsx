import { Button } from 'antd';
import styles from './index.module.scss';
import AddForm from './AddForm';
export default function Site() {
  return (
    <div className={styles.Site}>
      <Button type="primary">添加站点</Button>
      <AddForm />
    </div>
  );
}
