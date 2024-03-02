import z from 'zod'

export const historySchema = z.object({
  data: z.object({
    date_time:  z.preprocess( arg => typeof arg == 'string' ? new Date( arg ) : undefined, z.date() ).optional(),
		license_plate: z.string().optional(),
		province: z.string().optional(),
		brand: z.string().optional(),
		img_car_path: z.string().optional(),
		img_license_path: z.string().optional()
  }),
  car_image: z.string(),
  license_image: z.string(),
})

export type History = z.infer<typeof historySchema>