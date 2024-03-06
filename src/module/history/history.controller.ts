import { Controller, Get, Param } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { History, historySchema } from "@src/types/history.type";
import HistoryService from "./history.service";
import SocketSessionService from "../realtime/socket/socketSession.service";

@Controller('history')
class HistoryController {
  constructor (private readonly historyService: HistoryService) {}

  @MessagePattern('history')
  async imageHandler(@Payload() message: History) {
    const parsedHistory = historySchema.parse(message)
    const history = await this.historyService.historyHandler(parsedHistory)
    console.log(history)

    SocketSessionService.broadcaseChannel("realtime",history )
  }

  @Get('')
  getAllHistory() {
    return this.historyService.getAll()
  }

  @Get(':id')
  getHistoryById(@Param('id') id: number) {
    return this.historyService.getById(id)
  }
}

export default HistoryController