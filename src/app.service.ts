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
    this.sendMailService.sendMail({
      subject: `🎉 Congrats! You're in the Penalty Challenge draw`,
      to: emailTo,
      textMessage:
      type === 2 ?
      `
      <html>
      <head></head>
      <body>
      <h1 style='text-align: center;'>Tomorrow’s draw will be on Instagram</h1>
      <p><strong>Congratulations! You’re entered into the Penalty Challenge prize draw.</strong></p>
      <p>Your entry number: <strong>${numberWin}</strong></p>
      <p>The draw will take place on July 3 at 4:00 PM on our Instagram: <strong>@boomerang.partners.</strong></p>
      <p>Follow us now and check our stories on July 3 to see if you’re a winner</p>
      <p>Winners will be contacted by email.</p>
      <p>Good luck!</p>
      <p style='text-align: center;'><i>This is an automated message. Do not reply.</i></p>
      </body>
      </html>
      ` :
      `
      <html>
      <head></head>
      <body>
      <h1 style='text-align: center;'>Visit Stand F50 – Boomerang to join the prize draw</h1>
      <p><strong>Congratulations! You’re entered into the Penalty Challenge prize draw.</strong></p>
      <p>Your entry number: <strong>${numberWin}</strong></p>
      <p>Join us at the Stand F50 – Boomerang on <strong>July 2, at 16:00.</strong></p>
      <p>To take part in the prize draw, just show your numbered sticker.</p>
      <p>⚠️ <strong>If you’re not at the booth during the draw, the prize will go to someone else — we’ll pick a new winner.</strong></p>
      <p>Good luck!</p>
      <p style='text-align: center;'><i>This is an automated message. Do not reply.</i></p>
      </body>
      </html>
      `
      ,
    }).then((result) => {
      //console.log(result);
    }).catch((error) => {
      console.error('Email не отправлено!', error);
    });
  }

}
