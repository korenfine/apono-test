import { z } from 'zod';

export const CheckAuthDtoSchema = z.object({
  citizen: z.string(),
  place: z.string(),
});

export type CheckAuthDto = z.infer<typeof CheckAuthDtoSchema>;
