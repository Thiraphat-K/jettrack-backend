import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfigSchema } from "../../config/app/configuration";
import AppConfigService from "./config.service";

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      validate: config => appConfigSchema.parse(config),
      isGlobal: true,
    }),
  ],
})
class AppConfigModule {}

export default AppConfigModule;
