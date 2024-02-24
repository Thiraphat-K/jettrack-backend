import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import CatchAllExceptionFilter from "./common/exception/catchAllException.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new CatchAllExceptionFilter(httpAdapterHost));

  await app.listen(3001);
}
bootstrap();
