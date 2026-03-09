import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LiveService {
  private readonly baseUrl: string;
  private readonly authHeader: string;

  constructor(private config: ConfigService) {
    this.baseUrl = `http://${this.config.get<string>('MEDIAMTX_IP_ADDRESS')}:9997`;
    const user = this.config.get<string>('MEDIAMTX_USER');
    const pass = this.config.get<string>('MEDIAMTX_PASS');
    this.authHeader =
      'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
  }

  private async fetchApi<T>(path: string): Promise<T | null> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        headers: { Authorization: this.authHeader },
      });
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    } catch {
      return null;
    }
  }

  async getStreamAlive(): Promise<{ streamAlive: boolean }> {
    const streamPath = this.config.get<string>('MEDIAMTX_PUBLISH_PATH');
    const data = await this.fetchApi<{ name: string; ready: boolean }>(
      `/v3/paths/get/${streamPath}`,
    );
    return { streamAlive: data?.ready ?? false };
  }

  async getObsConnected(): Promise<{ obsConnected: boolean }> {
    const data = await this.fetchApi<{ items: unknown[] }>(
      '/v3/rtmpconns/list',
    );
    return { obsConnected: (data?.items?.length ?? 0) > 0 };
  }

  async getViewerCount(): Promise<{ viewerCount: number }> {
    const data = await this.fetchApi<{ items: unknown[] }>(
      '/v3/webrtcsessions/list',
    );
    return { viewerCount: data?.items?.length ?? 0 };
  }
}
