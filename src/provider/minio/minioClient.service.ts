import { Injectable } from "@nestjs/common";
import AppConfigService from "@src/config/app/config.service";
import generateUUID from "@src/utils/generateUUID";
import { MinioClient, MinioService } from "nestjs-minio-client";

@Injectable()
class MinioClientService {
  constructor(private readonly minioService: MinioService, private readonly appConfigService: AppConfigService) {}

  getClient(): MinioClient {
    return this.minioService.client;
  }

  async uploadImageFromBuffer(bucketName: string, buffer: Buffer): Promise<string> {
    const carImageName = generateUUID() + ".jpg";

    await this.getClient().putObject(bucketName, carImageName, buffer, buffer.length, {
      "Content-Type": "image/jpeg",
    });
    return "http://" + this.appConfigService.get("MINIO_HOST") + ":" + this.appConfigService.get("MINIO_PORT") + `/${bucketName}/` + carImageName;
  }
}

export default MinioClientService;
