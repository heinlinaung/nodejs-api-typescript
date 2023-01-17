// import express
import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
//create express app
const app = express();
const port = config.get<number>('port');

// listen app
app.listen(port, async () => {
  logger.info('Server is running on port 3000');
  await connect()
})