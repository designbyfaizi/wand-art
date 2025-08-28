import { z } from 'zod';

export const TestSchema = z.object({
    foo: z.string().min(1).max(10).default('bar'),
});

export type TestType = z.infer<typeof TestSchema>;