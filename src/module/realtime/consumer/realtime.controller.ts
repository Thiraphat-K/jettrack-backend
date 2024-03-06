import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import SocketSessionService from '../socket/socketSession.service';

@Controller()
class RealtimeController {

  constructor (private readonly socketSessionService: SocketSessionService) {}

  @MessagePattern('frame')
  imageHandler(@Payload() message: string) {
    SocketSessionService.broadcast(message)
  }
}

export default RealtimeController