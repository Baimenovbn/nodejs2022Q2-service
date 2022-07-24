import { v4 as uuidv4 } from 'uuid';

import { Database } from '../../DB';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

export class ArtistsRepository {
  static getById(id: string) {
    return Database.artistsTable.get(id);
  }

  static getAll() {
    return Array.from(Database.artistsTable.values());
  }

  static removeById(id: string) {
    return Database.artistsTable.delete(id);
  }

  static create(artist: CreateArtistDto) {
    const newArtist = { id: uuidv4(), ...artist };
    Database.artistsTable.set(newArtist.id, newArtist);
    return newArtist;
  }

  static update(id: string, updatedArtist: Artist) {
    Database.artistsTable.set(id, updatedArtist);
    return updatedArtist;
  }
}
