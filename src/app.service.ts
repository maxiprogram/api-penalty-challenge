import { Injectable, Logger } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class AppService {
  videoPath: {
    host_video: string,
    array_answers: Array<boolean>
  };
  
  constructor() {
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

}
