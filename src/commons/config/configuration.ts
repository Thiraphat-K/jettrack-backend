import z from "zod";

export const configurationSchema = z.object({
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_DATABASE: z.string(),
});

export type Configuration = z.infer<typeof configurationSchema>;
