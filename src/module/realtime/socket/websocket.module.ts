import { Module } from "@nestjs/common";
import SocketGateway from "./socket.gateway";
import SocketSessionService from "./socketSession.service";

@Module({
  providers: [SocketGateway, SocketSessionService],
  exports: [SocketSessionService],
})
class WebsocketModule {}

export default WebsocketModule;
