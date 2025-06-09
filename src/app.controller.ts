import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { RecordDataDto } from './dto/record-data-dto';
import { PrismaService } from './prisma/prisma.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleSheetService: GoogleSheetService,
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('append')
  @HttpCode(200)
  async appendRecord(@Body() recordData: RecordDataDto) {

    switch (recordData.nameSheet) {
      case 'SheetA': {
        const newRecord = await this.prismaService.sheetA.create({
          data: {
            first_name: recordData.firstName,
            last_name: recordData.lastName,
            email: recordData.email,
            sphere: recordData.sphere
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.id = newRecord.id.toString();
        break;
      }
      case 'SheetB': {
        const newRecord = await this.prismaService.sheetB.create({
          data: {
            first_name: recordData.firstName,
            last_name: recordData.lastName,
            email: recordData.email,
            sphere: recordData.sphere
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.id = newRecord.id.toString();
        break;
      }
      case 'SheetC': {
        const newRecord = await this.prismaService.sheetC.create({
          data: {
            first_name: recordData.firstName,
            last_name: recordData.lastName,
            email: recordData.email,
            sphere: recordData.sphere
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.id = newRecord.id.toString();
        break;
      }
      case 'SheetS': {
        const newRecord = await this.prismaService.sheetS.create({
          data: {
            first_name: recordData.firstName,
            last_name: recordData.lastName,
            email: recordData.email,
            sphere: recordData.sphere
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.id = newRecord.id.toString();
        break;
      }   
    }
    
    await this.googleSheetService.appenRecord(recordData);

    return {status: 'ok', id: recordData.id}
  }

  @Post('auth-google-callback')
  async authGoogleCallback(@Body() body) {
    Logger.log(body, 'BODY');
  }

  
}
