import { v4 as uuidv4 } from 'uuid';

import { Database } from '../../DB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

export class AlbumsRepository {
  static getById(id: string) {
    return Database.albumsTable.get(id);
  }

  static getAll() {
    return Array.from(Database.albumsTable.values());
  }

  static removeById(id: string) {
    this.removeFromTracksTable(id);
    return Database.albumsTable.delete(id);
  }

  static create(album: CreateAlbumDto) {
    Database.throwIfNotInTable(album.artistId, 'artistsTable', 'Artist');
    const newAlbum = { id: uuidv4(), ...album };
    Database.albumsTable.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  static update(id: string, updatedAlbum: Album) {
    Database.throwIfNotInTable(updatedAlbum.artistId, 'artistsTable', 'Artist');
    Database.albumsTable.set(id, updatedAlbum);
    return updatedAlbum;
  }

  private static removeFromTracksTable(id: string) {
    const trackByAlbumId = Array.from(Database.tracksTable.values()).find(
      (track) => track.albumId === id,
    );
    if (trackByAlbumId) {
      Database.tracksTable.set(trackByAlbumId.id, {
        ...trackByAlbumId,
        albumId: null,
      });
    }
  }
}
