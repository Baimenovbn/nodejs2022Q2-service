import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { Database } from '../../DB';

export class TracksRepository {
  static getById(id: string) {
    return Database.tracksTable.get(id);
  }

  static getAll() {
    return Array.from(Database.tracksTable.values());
  }

  static removeById(id: string) {
    Database.favouritesTable.tracks.delete(id);
    return Database.tracksTable.delete(id);
  }

  static create(track: CreateTrackDto) {
    this.throwIfWrongForeignKeys(track.albumId, track.artistId);
    const newTrack = { id: uuidv4(), ...track };
    Database.tracksTable.set(newTrack.id, newTrack);
    return newTrack;
  }

  static update(id: string, updatedTrack: Track) {
    this.throwIfWrongForeignKeys(updatedTrack.albumId, updatedTrack.artistId);
    Database.tracksTable.set(id, updatedTrack);
    return updatedTrack;
  }

  private static throwIfWrongForeignKeys(albumId: string, artistId: string) {
    Database.throwIfNotInTable(albumId, 'albumsTable', 'Album');
    Database.throwIfNotInTable(artistId, 'artistsTable', 'Artist');
  }
}
