import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ResponseModel, ResponseStatus } from "../model/response.model";

@Catch()
class CatchAllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpData = exception instanceof HttpException ? exception.message : "internal server error";

    const responseBody: ResponseModel<string> = {
      statusCode: httpStatus,
      response: {
        status: ResponseStatus.FAIL,
        data: httpData,
      },
    };

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
  }
}

export default CatchAllExceptionFilter;
