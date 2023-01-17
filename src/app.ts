// import express
import express from 'express';
import config from 'config';
//create express app
const app = express();
const port = config.get<number>('port');

// listen app
app.listen(port, () => {
  console.log('Server is running on port 3000');
})