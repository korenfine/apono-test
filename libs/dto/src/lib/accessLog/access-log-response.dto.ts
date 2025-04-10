import { z } from 'zod';

export const AccessLogSchema = z.object({
  citizen: z.string(),
  role: z.string(),
  place: z.string(),
  result: z.string(),
  timestamp: z.date(),
});

export const AccessLogResponseSchema = z.array(AccessLogSchema);

export type AccessLogDto = z.infer<typeof AccessLogSchema>;
export type AccessLogResponseDto = z.infer<typeof AccessLogResponseSchema>;
