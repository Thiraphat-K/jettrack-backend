import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import SocketSessionService from '../socket/socketSession.service';

@Controller()
class KafkaRealtimeController {

  constructor (private readonly socketSessionService: SocketSessionService) {}

  @MessagePattern('image')
  imageHandler(@Payload() message: string) {
    console.log(message)
    SocketSessionService.broadcast(message)
  }
}

export default KafkaRealtimeController