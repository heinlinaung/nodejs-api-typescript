import mongoose from "mongoose";
import config from "config";
import logger from './logger';

async function connect() {
  try {
    const db = config.get<string>('mongoURI');
    await mongoose.connect(db)
    logger.info('MongoDB connected')
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

export default connect;