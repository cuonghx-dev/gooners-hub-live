import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FootballService {
  private readonly apiUrl = 'https://api.football-data.org/v4';
  private readonly token: string;

  constructor(private config: ConfigService) {
    this.token = this.config.get<string>('FOOTBALL_API_TOKEN', '');
  }

  private async fetchApi<T>(path: string): Promise<T> {
    const res = await fetch(`${this.apiUrl}${path}`, {
      headers: { 'X-Auth-Token': this.token },
    });
    if (!res.ok) throw new Error(`Football API error: ${res.status}`);
    return res.json() as Promise<T>;
  }

  async getMatches() {
    return this.fetchApi('/teams/57/matches?status=SCHEDULED');
  }

  async getStandings() {
    return this.fetchApi('/competitions/PL/standings');
  }
}
