import {
  createPool,
  PoolOptions,
  Pool,
} from 'mysql2/promise'
import "dotenv/config"

const options: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_AUTH_STRING,
  database: process.env.MYSQL_DEF_SCHEMA,
  connectTimeout: 10000,
  ssl: {
      rejectUnauthorized: true,
      ca: process.env.MYSQL_CA_CERT
  }
}

export default class MySQL {
  private conn: Pool;

  constructor() {
    this.conn = createPool(options);
  }

  /** A random method to simulate a step before to get the class methods */
  private ensureConnection() {
    if (!this?.conn) this.conn = createPool(options);
  }

  /** For `SELECT` and `SHOW` */
  get queryRows() {
    this.ensureConnection();
    return this.conn.query.bind(this.conn);
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  get queryRowsAsArray() {
    this.ensureConnection();
    return this.conn.query.bind(this.conn);
  }

  /** For `INSERT`, `UPDATE`, etc. */
  get queryResult() {
    this.ensureConnection();
    return this.conn.query.bind(this.conn);
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  get queryResults() {
    this.ensureConnection();
    return this.conn.query.bind(this.conn);
  }

  get prepare() {
    this.ensureConnection();
    return this.conn.prepare.bind(this.conn);
  }

  /** For `SELECT` and `SHOW` */
  get executeRows() {
    this.ensureConnection();
    return this.conn.execute.bind(this.conn);
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  get executeRowsAsArray() {
    this.ensureConnection();
    return this.conn.execute.bind(this.conn);
  }

  /** For `INSERT`, `UPDATE`, etc. */
  get executeResult() {
    this.ensureConnection();
    return this.conn.execute.bind(this.conn);
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  get executeResults() {
    this.ensureConnection();
    return this.conn.execute.bind(this.conn);
  }

  /** Expose the Pool Connection */
  get connection() {
    return this.conn;
  }
  
  get end() {
    return this.conn.end.bind(this.conn);
  }
}