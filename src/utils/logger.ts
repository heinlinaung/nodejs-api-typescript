// import dayjs
import pino from 'pino';
import dayjs from 'dayjs';

// create logger
const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;