import { Album } from '../entities/album.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAlbumDto extends OmitType(Album, ['id'] as const) {}
