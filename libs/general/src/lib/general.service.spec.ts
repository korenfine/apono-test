import { Test, TestingModule } from '@nestjs/testing';
import { GeneralService } from './general.service';
import { getModelToken } from '@nestjs/mongoose';
import { CitizenModel } from '@models/citizen.model';
import { PlaceModel } from '@models/place.model';
import { AccessLogModel } from '@models/access-log.model';

// Mock data
const mockCitizens = [
  { name: 'Citizen 1' },
  { name: 'Citizen 2' },
];

const mockPlaces = [
  { name: 'Place 1' },
  { name: 'Place 2' },
];

const mockAccessLogs = [
  {
    citizen: 'Citizen 1',
    role: 'Admin',
    place: 'Place 1',
    result: 'allowed',
    timestamp: new Date(),
  },
  {
    citizen: 'Citizen 2',
    role: 'User',
    place: 'Place 2',
    result: 'denied',
    timestamp: new Date(),
  },
];

describe('GeneralService', () => {
  let service: GeneralService;

  // Mock the models to be injected into the service
  const mockCitizenModel = {
    find: jest.fn().mockResolvedValue(mockCitizens),
  };
  const mockPlaceModel = {
    find: jest.fn().mockResolvedValue(mockPlaces),
  };
  const mockAccessLogModel = {
    find: jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockAccessLogs),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneralService,
        {
          provide: getModelToken(CitizenModel.name),
          useValue: mockCitizenModel,
        },
        {
          provide: getModelToken(PlaceModel.name),
          useValue: mockPlaceModel,
        },
        {
          provide: getModelToken(AccessLogModel.name),
          useValue: mockAccessLogModel,
        },
      ],
    }).compile();

    service = module.get<GeneralService>(GeneralService);
  });

  describe('getCitizens', () => {
    it('should return a list of citizens with name and value', async () => {
      const result = await service.getCitizens();
      expect(result).toEqual([
        { value: 'Citizen 1', label: 'Citizen 1' },
        { value: 'Citizen 2', label: 'Citizen 2' },
      ]);
      expect(mockCitizenModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPlaces', () => {
    it('should return a list of places with name and value', async () => {
      const result = await service.getPlaces();
      expect(result).toEqual([
        { value: 'Place 1', label: 'Place 1' },
        { value: 'Place 2', label: 'Place 2' },
      ]);
      expect(mockPlaceModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAccessLogs', () => {
    it('should return a list of access logs', async () => {
      const result = await service.getAccessLogs();
      expect(result).toEqual([
        {
          citizen: 'Citizen 1',
          role: 'Admin',
          place: 'Place 1',
          result: 'allowed',
          timestamp: expect.any(Date),
        },
        {
          citizen: 'Citizen 2',
          role: 'User',
          place: 'Place 2',
          result: 'denied',
          timestamp: expect.any(Date),
        },
      ]);
      expect(mockAccessLogModel.find).toHaveBeenCalledTimes(1);
    });
  });
});
