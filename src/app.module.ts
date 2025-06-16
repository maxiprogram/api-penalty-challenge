import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SendMailService } from './send-mail-service/send-mail-service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({
      rootPath: process.env.STATIC_PATH, //join(__dirname, '../..', 'static'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleSheetService, PrismaService, SendMailService],
})
export class AppModule {}
