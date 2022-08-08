import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { Request } from 'express';

import { open, writeFile, stat, appendFile } from 'fs/promises';
import { resolve } from 'path';

const pathToLogDir = resolve(__dirname, '../../../logs');
const pathToErrorFile = resolve(pathToLogDir, './errors.txt');
const pathToLogFile = resolve(pathToLogDir, './logs.txt');
const maxFileSize = process.env.LOG_FILE_SIZE;

const getLogField = (fieldName: string, value: string | number) =>
  `\t * ${fieldName}: ${value}\n`;

const getObjectLog = <T>(title: string, obj: T) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => `${acc}\t    ${key}: ${value}`,
    getLogField(title, ''),
  );

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  getLogRequestInfo(
    { url, body, query }: Request,
    statusCode: number,
    response: any,
  ) {
    let result = getLogField('Url', url);
    result += getObjectLog('Body', body);
    result += getObjectLog('Query', query);
    result += `\t * Response: ${JSON.stringify(response)}\n`;
    result += getLogField('Status Code', statusCode);
    return result;
  }

  async logRequestError(request: Request, statusCode: number, response: any) {
    if (!this.isLevelEnabled('error')) {
      return;
    }

    const header = `[ERROR] Request: ${new Date().toLocaleString()}\n`;
    const logResult =
      header + this.getLogRequestInfo(request, statusCode, response);
    await appendFile(pathToLogFile, logResult);
    console.log(logResult);
  }

  async logRequest(request: Request, statusCode: number, response: any) {
    if (!this.isLevelEnabled('log')) {
      return;
    }

    const header = `[LOG] Request: ${new Date().toLocaleString()}\n`;
    const logResult =
      header + this.getLogRequestInfo(request, statusCode, response);
    await appendFile(pathToLogFile, logResult);
    console.log(logResult);
  }
}
