import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { RecordDataDto, UpdateRecordDataDto } from './dto/record-data-dto';
import { PrismaService } from './prisma/prisma.service';
import { SendMailService } from './send-mail-service/send-mail-service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleSheetService: GoogleSheetService,
    private readonly prismaService: PrismaService,
    private readonly sendMailService: SendMailService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get-video')
  getVideo() {
    let min = 0;
    let max = this.appService.videoPath.array_answers.length;
    let rnd = Math.floor(Math.random() * (max - min + 1)) + min;
    rnd = 0;
    
    return {
      url_video_short: `${this.appService.videoPath.host_video}/videos/short/${rnd}.mp4`,
      url_video_full: `${this.appService.videoPath.host_video}/videos/full/${rnd}.mp4`,
      answer: this.appService.videoPath.array_answers[rnd],
    };
  }

  @Post('append')
  @HttpCode(200)
  async appendRecord(@Body() recordData: RecordDataDto) {

    console.time('Time append DB');
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
        recordData.id = newRecord.id;
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
        recordData.id = newRecord.id;
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
        recordData.id = newRecord.id;
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
        recordData.id = newRecord.id;
        break;
      }   
    }
    console.timeEnd('Time append DB');

    //console.time('Time append Sheet');
    this.googleSheetService.appenRecord(recordData).then((result) => {

    }).catch((error) => {
      console.error('Данные не записаны!');
    });
    //console.timeEnd('Time append Sheet');

    return {status: 'ok', id: recordData.id}
  }

  @Post('update')
  @HttpCode(200)
  async updateRecord(@Body() recordData: UpdateRecordDataDto) {

    console.time('Time update DB');
    switch (recordData.nameSheet) {
      case 'SheetA': {
        const newRecord = await this.prismaService.winSheetA.create({
          data: {
            id_user: recordData.idUser
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.idWin = newRecord.id;
        break;
      }
      case 'SheetB': {
        const newRecord = await this.prismaService.winSheetB.create({
          data: {
            id_user: recordData.idUser
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.idWin = newRecord.id;
        break;
      }
      case 'SheetC': {
        const newRecord = await this.prismaService.winSheetC.create({
          data: {
            id_user: recordData.idUser
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.idWin = newRecord.id;
        break;
      }
      case 'SheetS': {
        const newRecord = await this.prismaService.winSheetS.create({
          data: {
            id_user: recordData.idUser
          }
        });
        //console.log('newRecord:', newRecord);
        recordData.idWin = newRecord.id;
        break;
      }
    }
    console.timeEnd('Time update DB');
    
    //console.time('Time update Sheet');
    this.googleSheetService.updateRecord(recordData).then((result) => {

    }).catch((error) => {
      console.error('Данные не обновлены!');
    });
    //console.timeEnd('Time update Sheet');

    return {status: 'ok', id_win: recordData.idWin}
  }

  @Get('test-mail')
  async test_mail() {
    let result = await this.sendMailService.sendMail({
      username: 'test_username',
      subject: 'test_sybject',
      from: 'from_email',
      textMessage: 'Hello World!',
    });
    console.log(result);
    return {status: 'ok'};
  }

  @Post('auth-google-callback')
  async authGoogleCallback(@Body() body) {
    Logger.log(body, 'BODY');
  }

  
}
