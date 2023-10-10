import app from './app';
import { APP_PORT, MYSQL_HOST } from './config';

app.listen(APP_PORT, () => {
  console.log(`server is running on http://${MYSQL_HOST}:${APP_PORT}`);
});
