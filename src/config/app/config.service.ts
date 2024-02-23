import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./configuration";


@Injectable()
class AppConfigService {
  constructor(private configService: ConfigService<AppConfig, true>) {}

  get<T extends keyof AppConfig>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}


export default AppConfigService