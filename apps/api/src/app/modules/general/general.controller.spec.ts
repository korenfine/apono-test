import { Test, TestingModule } from '@nestjs/testing';
import { AppGeneralController } from './general.controller';
import { AppGeneralService } from './general.service';

describe('AppGeneralController', () => {
  let controller: AppGeneralController;
  let service: AppGeneralService;

  // Mock data
  const mockFormData = {
    citizens:[
      { value: 'John', label: 'John' },
      { value: 'Jane', label: 'Jane' },
    ],
    places:[
      { value: 'place1', label: 'place1' },
      { value: 'place2', label: 'place2' },
    ]
  };

  const mockAccessLogs = [
    { citizen: 'John', role: 'admin', place: 'Place1', result: 'allowed', timestamp: new Date() },
    { citizen: 'Jane', role: 'user', place: 'Place2', result: 'denied', timestamp: new Date() },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppGeneralController],
      providers: [
        {
          provide: AppGeneralService,
          useValue: {
            getFormData: jest.fn().mockResolvedValue(mockFormData),
            getAccessLogs: jest.fn().mockResolvedValue(mockAccessLogs),
          },
        },
      ],
    }).compile();

    controller = module.get<AppGeneralController>(AppGeneralController);
    service = module.get<AppGeneralService>(AppGeneralService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Resets all mock functions
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return form data', async () => {
    const result = await controller.getFormData();

    expect(result).toEqual(mockFormData);
    expect(service.getFormData).toHaveBeenCalled();
  });

  it('should return access logs', async () => {
    const result = await controller.getAccessLogs();

    expect(result).toEqual(mockAccessLogs);
    expect(service.getAccessLogs).toHaveBeenCalled();
  });
});
