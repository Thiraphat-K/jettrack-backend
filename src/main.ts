import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import KafkaProviderModule from "./provider/kafka/kafkaProvider.module";

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


  const kafkaClient = await NestFactory.createMicroservice<MicroserviceOptions>(KafkaProviderModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "backend-consumer",
        brokers: ["localhost:9093"],
      },
      consumer: {
        groupId: "1",
      },
      postfixId: "",
    },
  });

  kafkaClient.listen();
  app.listen(3001);
}
bootstrap();
