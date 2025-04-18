import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvConfigService', () => {
    let service: EnvConfigService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EnvConfigService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key: string) => {
                            if (key === 'PORT') {
                                return '3000'; // Ou poderia ser 3000 diretamente
                            }
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<EnvConfigService>(EnvConfigService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the variable PORT', () => {
        // Opcional: você pode adicionar esta verificação para garantir que o mock está sendo chamado
        jest.spyOn(configService, 'get').mockReturnValue('3000');

        const port = service.getAppPort();
        expect(port).toBe(3000);
        // Opcional: verificar se o método get foi chamado com o parâmetro correto
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get).toHaveBeenCalledWith('PORT');
    });

    it('should return the variable NODE_ENV', () => {
        // Opcional: você pode adicionar esta verificação para garantir que o mock está sendo chamado
        jest.spyOn(configService, 'get').mockReturnValue('test');

        const nodeENV = service.getNodeEnv();
        expect(nodeENV).toBe('test');
        // Opcional: verificar se o método get foi chamado com o parâmetro correto
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get).toHaveBeenCalledWith('NODE_ENV');
    });
});
