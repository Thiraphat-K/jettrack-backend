import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import KafkaRealtimeModule from "./module/realtime/consumer/kafkaRealtime.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "http://localhost:3000" } });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: "http://localhost:3000",
  });


  const kafkaClient = await NestFactory.createMicroservice<MicroserviceOptions>(KafkaRealtimeModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "consumer-1",
        brokers: ["localhost:9093"],
      },
      consumer: {
        groupId: "",
      },
      postfixId: "",
    },
  });

  await kafkaClient.listen();
  await app.listen(3001);
}
bootstrap();
