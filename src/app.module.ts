import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleSheetService],
})
export class AppModule {}
