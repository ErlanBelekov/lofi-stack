import { z } from "zod";

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  APP_ENV: z.enum(["PRODUCTION", "STAGE", "DEVELOPMENT"]),

  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  INSTANCE_UNIX_SOCKET: z.string().optional(),
  DATABASE_NAME: z.string(),
});

export const env = EnvironmentSchema.parse(process.env);
