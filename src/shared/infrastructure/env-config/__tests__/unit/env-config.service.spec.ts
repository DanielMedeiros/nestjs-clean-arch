import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvConfigService', () => {
    let service: EnvConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EnvConfigService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(), // Mock do ConfigService
                    },
                },
            ],
        }).compile();

        service = module.get<EnvConfigService>(EnvConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
