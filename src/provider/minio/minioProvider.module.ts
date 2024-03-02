import { Module } from "@nestjs/common";
import AppConfigModule from "@src/config/app/config.module";
import AppConfigService from "@src/config/app/config.service";
import { MinioModule } from "nestjs-minio-client";
import MinioClientService from "./minioClient.service";

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        return {
          endPoint: config.get("MINIO_HOST"),
          port: config.get("MINIO_PORT"),
          useSSL: false,
          accessKey: config.get("MINIO_ACCESS_KEY"),
          secretKey: config.get("MINIO_SECRET_KEY"),
        };
      },
    }),
  ],
  providers: [MinioClientService, AppConfigService],
  exports: [MinioClientService],
})
class MinioProviderModule {}

export default MinioProviderModule
