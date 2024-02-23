import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import AppConfigModule from "./config/app/config.module";

import DatabaseProviderModule from "./provider/database/databaseProvider.module";
import AuthModule from "./auth/auth.module";

@Module({
  imports: [AppConfigModule, DatabaseProviderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
