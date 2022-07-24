import { Artist } from '../modules/artists/entities/artist.entity';
import { ForeignKeyIsNotValid } from './errors/foreign-key-is-not-valid';

type tables = 'tracksTable' | 'usersTable' | 'albumsTable' | 'artistsTable';

export class Database {
  public static readonly artistsTable = new Map<string, Artist>();
  public static throwIfNotInTable(
    id: string,
    tableName: tables,
    resource: string,
  ) {
    if (id && !Database[tableName].has(id))
      throw new ForeignKeyIsNotValid(resource);
  }
}
