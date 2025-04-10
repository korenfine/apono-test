import { Injectable } from '@nestjs/common';

import { AuthService } from '@apono/auth';
import { CheckAuthDto } from '@apono/dto';

@Injectable()
export class AppAuthService {
  constructor(private readonly authService: AuthService) {}

  async checkAuth({ citizen, place }: CheckAuthDto): Promise<any> {
    return this.authService.checkAuth({ citizen, place });
  }
}
