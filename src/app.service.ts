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

  sendMail(emailTo: string, numberWin: string, type: 1|2 = 1) {
    let buffer = fs.readFileSync(`${process.env.STATIC_PATH}/template_mail/mail${type}.html`);
    let bufferAsString = buffer.toString('utf8');
    bufferAsString = bufferAsString.replace('{{NUMBER}}', numberWin);
    //console.log('tempale_mail:', bufferAsString);

    this.sendMailService.sendMail({
      subject: `🎉 Congrats! You're in the Penalty Challenge draw`,
      to: emailTo,
      textMessage: bufferAsString
    }).then((result) => {
      //console.log(result);
    }).catch((error) => {
      console.error('Email не отправлено!', error);
    });
  }

}
