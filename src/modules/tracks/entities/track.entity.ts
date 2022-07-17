import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Track {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;
}
