import { Injectable } from '@nestjs/common';

import { GeneralService } from '@apono/general';
import { AccessLogResponseDto, GetFormDataResponseDto } from '@apono/dto';

@Injectable()
export class AppGeneralService {
  constructor(private readonly generalService: GeneralService) {}

  async getFormData(): Promise<GetFormDataResponseDto> {
    const citizens = await this.generalService.getCitizens();
    citizens.unshift({ label: 'Select citizen', value: '' });

    const places = await this.generalService.getPlaces();
    places.unshift({ label: 'Select place', value: '' });

    return {
      citizens,
      places
    }
  }

  async getAccessLogs(): Promise<AccessLogResponseDto> {
    return this.generalService.getAccessLogs();
  }
}
