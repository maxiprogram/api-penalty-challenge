import { Injectable, Logger } from '@nestjs/common';
import { SendMailService } from './send-mail-service/send-mail-service';
const fs = require('fs');

@Injectable()
export class AppService {
  videoPath: {
    host_video: string,
    array_answers: Array<boolean>
  };
  
  constructor(private readonly sendMailService: SendMailService) {
    Logger.log('AppService initialized', 'AppService');
    this.videoPath = this.loadVideoPath();
    //console.log('this.videoPath', this.videoPath);
  }

  getHello(): string {
    return 'Hello World!';
  }

  private loadVideoPath() {
    if (fs.existsSync(process.env.VIDEOS_PATH)) {
      const content = fs.readFileSync(process.env.VIDEOS_PATH);
      return JSON.parse(content);
    }
    throw new Error('Файл данных видео не найден');
  }

  sendMail(emailTo: string) {
    this.sendMailService.sendMail({
      subject: 'test_subject',
      to: emailTo,
      textMessage: 'Hello World!',
    }).then((result) => {
      //console.log(result);
    }).catch((error) => {
      console.error('Email не отправлено!', error);
    });
  }

}
