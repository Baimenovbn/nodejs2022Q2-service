import { IsUUID } from 'class-validator';

export class Favourite {
  @IsUUID(4, { each: true })
  artists: string[];
  @IsUUID(4, { each: true })
  albums: string[];
  @IsUUID(4, { each: true })
  tracks: string[];
}
