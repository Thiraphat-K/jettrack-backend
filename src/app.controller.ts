import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import ConfigurationService from "./commons/services/configuration.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigurationService) {}

  @Get()
  getHello(): string {
    return this.configService.get("DB_HOST") + this.configService.get("DB_PASSWORD");
  }
}
