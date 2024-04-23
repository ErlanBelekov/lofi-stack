import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.server";
import { env } from "~/lib/env.server";

// Create the connection
const client = createClient({ url: env.DB_URL, authToken: env.DB_AUTH_TOKEN });

export const db = drizzle(client, { schema });
