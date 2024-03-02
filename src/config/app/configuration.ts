import z from "zod";

export const appConfigSchema = z.object({
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_DATABASE: z.string(),
  MINIO_HOST: z.string(),
  MINIO_PORT: z.coerce.number(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_CAR_BUCKET: z.string(),
  MINIO_LICENSE_BUCKET: z.string(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
