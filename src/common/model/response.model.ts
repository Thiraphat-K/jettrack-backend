import { HttpStatus } from "@nestjs/common";

export enum ResponseStatus {
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
}

export type ResponseModel<T> = {
  statusCode: number;
  response: {
    status: ResponseStatus;
    data: T;
  };
};
