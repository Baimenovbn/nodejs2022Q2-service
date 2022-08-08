import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export class ForeignKeyIsNotValid extends HttpException {
  constructor(foreignKey: string) {
    super(`${foreignKey} has not been found`, StatusCodes.NOT_FOUND);
  }
}
