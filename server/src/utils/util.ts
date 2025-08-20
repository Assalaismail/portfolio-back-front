import { ForbiddenException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { MongooseError } from "mongoose";


export function handleError(e: any): void {
    console.log(e);
    if (e instanceof HttpException) {
      throw e;
    }
    if (e instanceof MongooseError) {
      throw new ForbiddenException(e.message);
    }
    throw new InternalServerErrorException(e.message);
  }

  export const handleSuccess = (obj: AppResponse): AppResponse => {
    return obj;
  };


  export class AppResponse {
    constructor(data: any, message: string) {
      this.data = data;
      this.message = message;
    }
    data: any;
    message: string;
  }
