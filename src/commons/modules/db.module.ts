import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ConfigurationService from "../services/configuration.service";
import EnvModule from "./env.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => {
        console.log(configService.get("DB_HOST"));
        return {
          type: "postgres",
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          password: configService.get("DB_PASSWORD"),
          username: configService.get("DB_USERNAME"),
        };
      },
    }),
  ],
})
class DBModule {}

export default DBModule;
