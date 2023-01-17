// import express
import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import path from 'path';
import glob from 'glob';

const app = express();
app.use(express.json())
const port = config.get<number>('port');

app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  logger.info(process.env.NODE_ENV)
  await connect()

  let dir;
  if (process.env.NODE_ENV === 'dev') {
    dir = path.join(__dirname, './routes/*.ts')
  } else {
    dir = path.join(__dirname, './routes/*.js')
  }
  const routes = glob.sync(dir)
  routes.forEach(async route => {
    let file = await import(route);
    file.default(app)
  })
})