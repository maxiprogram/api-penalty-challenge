import { Test, TestingModule } from '@nestjs/testing';
import { SendMailService } from './send-mail-service';

describe('SendMailService', () => {
  let provider: SendMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailService],
    }).compile();

    provider = module.get<SendMailService>(SendMailService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
