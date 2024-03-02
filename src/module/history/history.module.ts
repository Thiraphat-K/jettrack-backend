import { Module } from "@nestjs/common";
import HistoryController from "./history.controller";
import HistoryService from "./history.service";
import { MinioModule, MinioService } from "nestjs-minio-client";
import AppConfigModule from "@src/config/app/config.module";
import AppConfigService from "@src/config/app/config.service";
import MinioProviderModule from "@src/provider/minio/minioProvider.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import History from "@src/model/history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([History]), MinioProviderModule],
  controllers: [HistoryController],
  providers: [HistoryService, AppConfigService],
  exports: [HistoryService],
})
class HistoryModule {}

export default HistoryModule;
