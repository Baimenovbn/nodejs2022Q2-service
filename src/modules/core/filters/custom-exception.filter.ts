import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../../logger/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: string | object = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage: 'There has been some error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = exception.getResponse();
    }

    this.loggingService.logRequestError(request, status, body);
    response.status(status).json(body);
  }
}
