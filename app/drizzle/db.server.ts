import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.server";
import { env } from "~/lib";

// Create the connection
const poolConnection = mysql.createPool({
  user: env.DATABASE_USERNAME, // e.g. 'my-db-user'
  password: env.DATABASE_PASSWORD, // e.g. 'my-db-password'
  database: env.DATABASE_NAME, // e.g. 'my-database'
  ...(env.APP_ENV === "DEVELOPMENT"
    ? {
        host: "127.0.0.1",
      }
    : {
        socketPath: env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
      }),
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
