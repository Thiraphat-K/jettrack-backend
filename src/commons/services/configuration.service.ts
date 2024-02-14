import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "../config/configuration";

@Injectable()
class ConfigurationService {
  constructor(private configService: ConfigService<Configuration, true>) {}

  get<T extends keyof Configuration>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}


export default ConfigurationService