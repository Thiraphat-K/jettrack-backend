import { Module } from "@nestjs/common";

import RealtimeController from "./realtime.controller";
import WebsocketModule from "../socket/websocket.module";
import SocketSessionService from "../socket/socketSession.service";
import RealtimeService from "./realtime.service";

@Module({
  imports: [WebsocketModule],
  providers: [RealtimeService],
  exports: [RealtimeService],
  controllers: [RealtimeController],
})
class RealtimeModule {}

export default RealtimeModule;
