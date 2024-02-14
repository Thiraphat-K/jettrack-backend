import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configurationSchema } from "../config/configuration";
import ConfigurationService from "../services/configuration.service";

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
  imports: [
    ConfigModule.forRoot({
      validate: v => configurationSchema.parse(v),
      isGlobal: true,
    }),
  ],
})
class EnvModule {}

export default EnvModule;
