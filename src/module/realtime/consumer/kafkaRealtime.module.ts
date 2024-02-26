import { Module } from "@nestjs/common";

import KafkaRealtimeController from "./kafkaRealtime.controller";
import WebsocketModule from "../socket/websocket.module";
import SocketSessionService from "../socket/socketSession.service";
import KafkaRealtimeService from "./kafkaRealtime.service";

@Module({
  imports: [WebsocketModule],
  providers: [KafkaRealtimeService],
  exports: [KafkaRealtimeService],
  controllers: [KafkaRealtimeController],
})
class KafkaRealtimeModule {}

export default KafkaRealtimeModule;
