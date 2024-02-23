import z from "zod";

export const appConfigSchema = z.object({
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_DATABASE: z.string(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
