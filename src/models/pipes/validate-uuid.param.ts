import { IsUUID } from 'class-validator';

export class ValidateUuidParam {
  @IsUUID(4)
  id: string;
}
