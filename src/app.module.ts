import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import AppConfigModule from "./config/app/config.module";

import DatabaseProviderModule from "./provider/database/databaseProvider.module";
import AuthModule from "./module/auth/auth.module";
import UserModule from "./module/user/user.module";
import WebsocketModule from "./module/realtime/socket/websocket.module";

@Module({
  imports: [AppConfigModule, WebsocketModule, DatabaseProviderModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
