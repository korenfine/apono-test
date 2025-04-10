import { z } from 'zod';

export const GetFormDataOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const GetFormDataSchema = z.object({
  citizens: z.array(GetFormDataOptionSchema),
  places: z.array(GetFormDataOptionSchema),
});

export type GetFormDataResponseDto = z.infer<typeof GetFormDataSchema>;
export type GetFormDataOptionDto = z.infer<typeof GetFormDataOptionSchema>;
