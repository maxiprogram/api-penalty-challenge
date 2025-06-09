import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { RecordDataDto } from './dto/record-data-dto';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleSheetService: GoogleSheetService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('append')
  @HttpCode(200)
  async appendRecord(@Body() recordData: RecordDataDto) {

    await this.googleSheetService.appenRecord(recordData);

    return {status: 'ok'}
  }

  @Post('auth-google-callback')
  async authGoogleCallback(@Body() body) {
    Logger.log(body, 'BODY');
  }

  
}
