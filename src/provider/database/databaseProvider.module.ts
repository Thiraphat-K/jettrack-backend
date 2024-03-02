import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AppConfigService from "@src/config/app/config.service";

import User from "@src/model/user.entity";
import AppConfigModule from "@src/config/app/config.module";
import History from "@src/model/history.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          type: "postgres",
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          password: configService.get("DB_PASSWORD"),
          username: configService.get("DB_USERNAME"),
          database: configService.get("DB_DATABASE"),
          entities: [User, History],
          synchronize: true,
        };
      },
    }),
  ],
})
class DatabaseProviderModule {}

export default DatabaseProviderModule;
