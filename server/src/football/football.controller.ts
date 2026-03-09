import { Controller, Get } from '@nestjs/common';
import { FootballService } from './football.service';

@Controller('football')
export class FootballController {
  constructor(private readonly football: FootballService) {}

  @Get('matches')
  getMatches() {
    return this.football.getMatches();
  }

  @Get('standings')
  getStandings() {
    return this.football.getStandings();
  }
}
