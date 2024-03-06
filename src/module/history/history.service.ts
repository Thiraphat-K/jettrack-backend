import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AppConfigService from "@src/config/app/config.service";
import { AppConfig } from "@src/config/app/configuration";
import History from "@src/model/history.entity";
import MinioClientService from "@src/provider/minio/minioClient.service";
import { History as IHistory } from "@src/types/history.type";
import generateUUID from "@src/utils/generateUUID";
import { MinioService } from "nestjs-minio-client";
import { Repository } from "typeorm";
import { GoogleRegisterDto } from "./dto/historyCreate.dto";

@Injectable()
class HistoryService {
  carBucketName: string;
  licenseBucketName: string;

  constructor(
    private readonly minioService: MinioClientService,
    private readonly appConfigService: AppConfigService,
    @InjectRepository(History)
    private readonly repository: Repository<History>,
  ) {
    this.carBucketName = this.appConfigService.get("MINIO_CAR_BUCKET");
    this.licenseBucketName = this.appConfigService.get("MINIO_LICENSE_BUCKET");
  }

  async _init() {
    await Promise.all([
      this._createBucketIfNotExists(this.appConfigService.get("MINIO_CAR_BUCKET")),
      this._createBucketIfNotExists(this.appConfigService.get("MINIO_LICENSE_BUCKET")),
    ]);
  }

  async _createBucketIfNotExists(bucketName: string) {
    const isBucketExist = await this.minioService.getClient().bucketExists(bucketName);
    if (!isBucketExist) {
      await this.minioService.getClient().makeBucket(bucketName);
    }
  }

  async historyHandler(history: IHistory): Promise<History> {
    const carBuffer = Buffer.from(history.car_image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const carImageUrl = await this.minioService.uploadImageFromBuffer(this.carBucketName, carBuffer);

    const licenseBuffer = Buffer.from(history.license_image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const licenseImageUrl = await this.minioService.uploadImageFromBuffer(this.licenseBucketName, licenseBuffer);

    const createdHistory = await this.create({
      brand: history.data.brand,
      car_image: carImageUrl,
      license_image: licenseImageUrl,
      license_plate: history.data.license_plate,
      province: history.data.province,
      timestamp: history.data.date_time,
    });

    return createdHistory
  }

  async create(history: GoogleRegisterDto): Promise<History> {
    const newHistory = await this.repository.create({
      brand: history.brand,
      car_image: history.car_image,
      license_image: history.license_image,
      license_plate: history.license_plate,
      province: history.province,
      timestamp: history.timestamp,
    });
    await this.repository.save(newHistory);
    return newHistory;
  }

  async getAll(): Promise<History[]> {
    return await this.repository.find({
      order: {
        timestamp: { direction: "DESC" },
      },
    });
  }

  async getById(id: number): Promise<History> {
    return await this.repository.findOneBy({ id });
  }
}

export default HistoryService;
