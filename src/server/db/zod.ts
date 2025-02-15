import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import * as schema from './schema';

export const selectPostSchema = createSelectSchema(schema.posts);
export type SelectPost = z.infer<typeof selectPostSchema>;
