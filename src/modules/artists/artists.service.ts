import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    return ArtistsRepository.create(createArtistDto);
  }

  findAll() {
    return ArtistsRepository.getAll();
  }

  findOne(id: string) {
    const artist = ArtistsRepository.getById(id);
    if (!artist) throw new ResourceNotFoundError('Artist');
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);

    return ArtistsRepository.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  remove(id: string) {
    const user = this.findOne(id);
    return ArtistsRepository.removeById(user.id);
  }
}
