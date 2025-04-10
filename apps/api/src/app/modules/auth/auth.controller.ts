import { Controller, Post, Body } from '@nestjs/common';

import type { CheckAuthDto } from '@apono/dto';
import { CheckAuthDtoSchema } from '@apono/dto';  // This is not a type, so it can remain normal import

import { AppAuthService } from './auth.service';

@Controller()
export class AppAuthController {
  constructor(private readonly appAuthService: AppAuthService) {}

  // checks authentication
  @Post('check-auth')
  async checkAuth(@Body() body: CheckAuthDto): Promise<any> {  // Explicitly typing return as `any` or another suitable type
    const { citizen, place } = CheckAuthDtoSchema.parse(body); // Throws on invalid input

    const status = await this.appAuthService.checkAuth({ citizen, place });

    return { status };
  }
}
