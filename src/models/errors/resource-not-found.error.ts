import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export class ResourceNotFoundError extends HttpException {
  public resourceName = '';

  constructor(resourceName: string) {
    super(`${resourceName} not found`, StatusCodes.NOT_FOUND);
    this.resourceName = resourceName;
  }
}
