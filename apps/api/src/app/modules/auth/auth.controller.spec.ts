import { Test, TestingModule } from '@nestjs/testing';
import { AppAuthController } from './auth.controller';
import { AppAuthService } from './auth.service';
import { CheckAuthDto } from '@apono/dto';

// Mock the AppAuthService
const mockAppAuthService = {
  checkAuth: jest.fn(),
};

describe('AppAuthController', () => {
  let app: TestingModule;
  let controller: AppAuthController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppAuthController],
      providers: [
        {
          provide: AppAuthService,
          useValue: mockAppAuthService,
        },
      ],
    }).compile();

    controller = app.get<AppAuthController>(AppAuthController);
  });

  describe('checkAuth', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Resets all mock functions
    });

    it('should return status "allowed" when authentication is successful', async () => {
      const mockRequest: CheckAuthDto = { citizen: 'Citizen 1', place: 'Place 1' };

      // Mock the checkAuth method to return 'allowed'
      mockAppAuthService.checkAuth.mockResolvedValue('allowed');

      const result = await controller.checkAuth(mockRequest);

      expect(result).toEqual({ status: 'allowed' });
      expect(mockAppAuthService.checkAuth).toHaveBeenCalledWith(mockRequest);
      expect(mockAppAuthService.checkAuth).toHaveBeenCalledTimes(1);
    });

    it('should return status "denied" when authentication fails', async () => {
      const mockRequest: CheckAuthDto = { citizen: 'Citizen 1', place: 'Place 1' };

      // Mock the checkAuth method to return 'denied'
      mockAppAuthService.checkAuth.mockResolvedValue('denied');

      const result = await controller.checkAuth(mockRequest);

      expect(result).toEqual({ status: 'denied' });
      expect(mockAppAuthService.checkAuth).toHaveBeenCalledWith(mockRequest);
      expect(mockAppAuthService.checkAuth).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when invalid input is provided', async () => {
      const invalidRequest = { citizen: 'Citizen 1' }; // Missing 'place'

      // Mock the checkAuth method to not be called since validation should fail first
      mockAppAuthService.checkAuth.mockResolvedValue('denied');

      await expect(controller.checkAuth(invalidRequest as any)).rejects.toThrow();
      expect(mockAppAuthService.checkAuth).not.toHaveBeenCalled();
    });
  });
});
