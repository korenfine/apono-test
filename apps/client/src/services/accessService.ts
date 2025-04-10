import api from './api';
import { AccessLogDto, GetFormDataResponseDto } from '@apono/dto';

export const fetchFormData = (): Promise<GetFormDataResponseDto> => api.get('/api/get-form-data');
export const checkAuth = (payload: { citizen: string, place: string }): Promise<{ status: string }> =>
  api.post('/api/check-auth', payload);
export const fetchAccessLogs = (): Promise<AccessLogDto[]> => api.get('/api/access-logs');
