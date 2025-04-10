import { AccessLogDto } from '@apono/dto';

export interface Column {
  id: keyof AccessLogDto;
  label: string;
  sort?: boolean;
  minWidth?: number;
  align?: 'right';
  format?: (value: unknown) => string;
}

export const columns: readonly Column[] = [
  { id: 'citizen', label: 'Citizen' },
  { id: 'role', label: 'Role' },
  { id: 'place', label: 'Place' },
  {
    id: 'result',
    label: 'Result',
    // TODO NICE TO HAVE: color green/red according to value
  },
  {
    id: 'timestamp',
    label: 'Timestamp',
    format: (value: unknown) => new Date(value as number).toLocaleString(),
  },
];
