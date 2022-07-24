import { Album } from '../modules/albums/entities/album.entity';
import { Artist } from '../modules/artists/entities/artist.entity';
import { ForeignKeyIsNotValid } from './errors/foreign-key-is-not-valid';
import { Favourite } from '../modules/favourites/entities/favourite.entity';

type tables = 'tracksTable' | 'usersTable' | 'albumsTable' | 'artistsTable';

export class Database {
  public static readonly albumsTable = new Map<string, Album>();
  public static readonly artistsTable = new Map<string, Artist>();
  public static readonly favouritesTable: Record<keyof Favourite, Set<string>> =
    {
      tracks: new Set<string>(),
      albums: new Set<string>(),
      artists: new Set<string>(),
    };

  public static throwIfNotInTable(
    id: string,
    tableName: tables,
    resource: string,
  ) {
    if (id && !Database[tableName].has(id))
      throw new ForeignKeyIsNotValid(resource);
  }
}
