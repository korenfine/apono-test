import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckAuthDto } from '@apono/dto';
import { CitizenModel, CitizenDocument } from '@models/citizen.model';
import { PlaceModel, PlaceDocument } from '@models/place.model';
import { AccessLogDocument, AccessLogModel } from '@models/access-log.model';
import { RoleModel } from '@models/role.model';

describe('AuthService', () => {
  let service: AuthService;
  let citizenModel: Model<CitizenDocument>;
  let placeModel: Model<PlaceDocument>;
  let accessLogModel: Model<AccessLogDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(CitizenModel.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(PlaceModel.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(AccessLogModel.name),
          useValue: {
            insertOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    citizenModel = module.get(getModelToken(CitizenModel.name));
    placeModel = module.get(getModelToken(PlaceModel.name));
    accessLogModel = module.get(getModelToken(AccessLogModel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkAuth', () => {
    it('should return allowed if citizen has allowed role', async () => {
      const dto: CheckAuthDto = { citizen: 'John Doe', place: 'Library' };

      const mockCitizen = {
        name: 'John Doe',
        roles: [{ name: 'Admin', subRoles: [] }],
        toObject: function () { return this; }
      };

      const mockPlace = {
        name: 'Library',
        rolesAllowed: [{ name: 'Admin' }],
        toObject: function () { return this; }
      };

      (citizenModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(mockCitizen) }),
      });

      (placeModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(mockPlace) }),
      });

      (accessLogModel.insertOne as any).mockResolvedValue({});

      const result = await service.checkAuth(dto);
      expect(result).toBe('allowed');
    });

    it('should return denied if citizen has no allowed roles', async () => {
      const dto: CheckAuthDto = { citizen: 'Jane', place: 'Office' };

      const mockCitizen = {
        name: 'Jane',
        roles: [{ name: 'User', subRoles: [] }],
        toObject: function () { return this; }
      };

      const mockPlace = {
        name: 'Office',
        rolesAllowed: [{ name: 'Manager' }],
        toObject: function () { return this; }
      };

      (citizenModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(mockCitizen) }),
      });

      (placeModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(mockPlace) }),
      });

      (accessLogModel.insertOne as any).mockResolvedValue({});

      const result = await service.checkAuth(dto);
      expect(result).toBe('denied');
    });

    it('should throw if citizen not found', async () => {
      (citizenModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(null) }),
      });

      await expect(service.checkAuth({ citizen: 'ghost', place: 'Nowhere' }))
        .rejects
        .toThrow('Citizen not found');
    });

    it('should throw if place not found', async () => {
      const mockCitizen = {
        name: 'John',
        roles: [],
        toObject: function () { return this; }
      };

      (citizenModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(mockCitizen) }),
      });

      (placeModel.findOne as any).mockReturnValue({
        populate: () => ({ exec: () => Promise.resolve(null) }),
      });

      await expect(service.checkAuth({ citizen: 'John', place: 'GhostPlace' }))
        .rejects
        .toThrow('Place not found');
    });
  });

  describe('checkRoleAccess', () => {
    it('should allow access when role matches', () => {
      const citizen = {
        roles: [{ name: 'Admin', subRoles: [] }]
      } as unknown as CitizenDocument;

      const rolesAllowed = [{ name: 'Admin' }] as unknown as RoleModel[];

      const result = service.checkRoleAccess({ citizen, rolesAllowed });
      expect(result).toEqual({ role: 'Admin', status: 'allowed' });
    });

    it('should allow access when subRole matches', () => {
      const citizen = {
        roles: [{ name: 'User', subRoles: ['Manager'] }]
      } as unknown as CitizenDocument;

      const rolesAllowed = [{ name: 'Manager' }] as unknown as RoleModel[];

      const result = service.checkRoleAccess({ citizen, rolesAllowed });
      expect(result).toEqual({ role: 'Manager', status: 'allowed' });
    });

    it('should deny access when no role matches', () => {
      const citizen = {
        roles: [{ name: 'Guest', subRoles: [] }]
      } as unknown as CitizenDocument;

      const rolesAllowed = [{ name: 'Admin' }] as unknown as RoleModel[];

      const result = service.checkRoleAccess({ citizen, rolesAllowed });
      expect(result).toEqual({ role: 'Guest', status: 'denied' });
    });
  });
});
