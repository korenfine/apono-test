import { Injectable } from '@nestjs/common';

import { AuthService } from '@apono/auth';
import { AccessLogResponseDto, CheckAuthDto } from '@apono/dto';
//
// function createData(
//   citizen: string,
//   role: string,
//   place: string,
//   result: string,
//   timestamp: number,
// ): IData {
//   return { citizen, role, place, result, timestamp };
// }
//
// export const rows: IData[] = [
//   createData('India', 'role', 'IN', 'allowed', 3287263),
//   createData('China', 'role', 'CN', 'allowed', 9596961),
//   createData('Italy', 'role', 'IT', 'denied', 301340),
//   createData('United States', 'role', 'US', 'allowed', 9833520),
//   createData('Canada', 'role', 'CA', 'denied', 9984670),
//   createData('Australia', 'role', 'AU', 'allowed', 7692024),
//   createData('Germany', 'role', 'DE', 'allowed', 357578),
// ];


@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  async checkAuth({ citizen, place }: CheckAuthDto): Promise<any> {
      return this.authService.checkAuth({ citizen, place });
  }

  async getAccessLogs(): Promise<AccessLogResponseDto[]> {
    return this.authService.getAccessLogs();
  }
}
