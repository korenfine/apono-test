import { Controller, Get } from '@nestjs/common';

import {
  AccessLogResponseDto,
  AccessLogResponseSchema,
  GetFormDataResponseDto,
  GetFormDataSchema,

} from '@apono/dto';

import { AppGeneralService } from './general.service';

@Controller()
export class AppGeneralController {
  constructor(private readonly appGeneralService: AppGeneralService) {}

  @Get('get-form-data')
  async getFormData(): Promise<GetFormDataResponseDto>{
    const data = await this.appGeneralService.getFormData();
    return GetFormDataSchema.parse(data);
  }

  @Get('access-logs')
  async getAccessLogs(): Promise<AccessLogResponseDto> {  // Explicitly typing return as `any` or another suitable type
    const data = await this.appGeneralService.getAccessLogs();
    return AccessLogResponseSchema.parse(data);
  }
}
