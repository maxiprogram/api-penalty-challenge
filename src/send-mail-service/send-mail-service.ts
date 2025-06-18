import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export interface MailMessage {
  subject: string;
  to: string|undefined;
  textMessage: string;
};

@Injectable()
export class SendMailService {
    private transporter: nodemailer.Transporter;
    public mailOptions: Mail.Options;

    constructor() {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT!),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      });

      this.mailOptions = {};
      this.mailOptions.from = process.env.SMTP_FROM;
      this.mailOptions.to = process.env.SMTP_TO;
      this.mailOptions.subject = 'Sending Email using Node.js';
    }

    sendMail(mailMessage: MailMessage) {
      this.mailOptions.subject = mailMessage.subject;
      this.mailOptions.text = `ТУТ ТЕКСТ + HTML ${mailMessage.textMessage}`;
      this.mailOptions.to = mailMessage.to;

      //console.log(this.mailOptions);

      return this.transporter.sendMail(this.mailOptions);
    }
}
