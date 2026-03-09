import { Controller, Get } from '@nestjs/common';
import { LiveService } from './live.service';

@Controller('live')
export class LiveController {
  constructor(private readonly live: LiveService) {}

  @Get('stream')
  getStreamAlive() {
    return this.live.getStreamAlive();
  }

  @Get('obs')
  getObsConnected() {
    return this.live.getObsConnected();
  }

  @Get('viewers')
  getViewerCount() {
    return this.live.getViewerCount();
  }
}
