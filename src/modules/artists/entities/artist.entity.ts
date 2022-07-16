import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Artist {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
