import {
  Pool, PoolOptions, createPool
} from 'mysql2/promise'
import "dotenv/config"

export default class DbUtils {
  private static credentials: PoolOptions = {
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_AUTH_STRING"],
    database: process.env["MYSQL_DEF_SCHEMA"],
    connectTimeout: 10000
  }
  private static pool: Pool;
  static {
    // console.log("Ping", this.credentials);
    this.pool = createPool(this.credentials);
  }

  /** A random method to simulate a step before to get the class methods */
  private static ensureConnection() {
    if (!this?.pool) this.pool = createPool(this.credentials);
  }

  /** Expose the Pool Connection */
  public static getConnection() {
    this.ensureConnection();
    return this.pool.getConnection();
  }
}