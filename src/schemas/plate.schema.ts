import { z } from 'zod';

export const plateSchema = z.object({
    id: z.string(),
    width: z.number().min(20, { message: "Width must be at least 20cm" }).max(300, { message: "Width must be at most 300cm" }),
    height: z.number().min(30, { message: "Height must be at least 30cm" }).max(128, { message: "Height must be at most 128cm" }),
})

export type PlateSchema = z.infer<typeof plateSchema>;