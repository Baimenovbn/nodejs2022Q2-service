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
    this.removeFromTracksTable(id);
    this.removeFromAlbumsTable(id);
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

  private static removeFromTracksTable(id: string) {
    const trackByArtistId = Array.from(Database.tracksTable.values()).find(
      (track) => track.artistId === id,
    );
    if (trackByArtistId) {
      Database.tracksTable.set(trackByArtistId?.id, {
        ...trackByArtistId,
        artistId: null,
      });
    }
  }

  private static removeFromAlbumsTable(id: string) {
    const albumsById = Array.from(Database.albumsTable.values()).find(
      (album) => album.artistId === id,
    );
    if (albumsById) {
      Database.albumsTable.set(albumsById?.id, {
        ...albumsById,
        artistId: null,
      });
    }
  }
}
