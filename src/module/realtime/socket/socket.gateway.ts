import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import SocketSessionService from "./socketSession.service";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTION"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
})
class SocketGateway {
  @SubscribeMessage("response")
  onGreet(client: Socket, payload: any) {
    SocketSessionService.register(client);
    client.emit("response", {
      message: `received: ${JSON.stringify(payload)}`,
    });
  }
}

export default SocketGateway