import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export class ResourceNotFoundError extends HttpException {
  constructor(resourceName: string) {
    super(`${resourceName} not found`, StatusCodes.NOT_FOUND);
  }
}
