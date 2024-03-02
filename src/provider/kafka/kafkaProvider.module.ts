import { Module } from "@nestjs/common";
import HistoryModule from "@src/module/history/history.module";
import RealtimeModule from "@src/module/realtime/consumer/realtime.module";
import DatabaseProviderModule from "../database/databaseProvider.module";

@Module({
  imports: [DatabaseProviderModule,RealtimeModule, HistoryModule, ]
})
class KafkaProviderModule {}

export default KafkaProviderModule;
