import { Pool } from 'pg';
import dotenv from 'dotenv';
import { config } from '../config/base.config';

dotenv.config();

const pool = new Pool({
  user: config.pgUserName,
  host: config.pgHost,
  database: config.pgDBName,
  password: config.pgPassword,
  port: Number(config.pgPort||'5432'),
  ssl:{
    rejectUnauthorized:true
  }

});

export default pool;
