import { Track } from '../modules/tracks/entities/track.entity';
import { User } from '../modules/users/entities/user.entity';
import { Album } from '../modules/albums/entities/album.entity';
import { Artist } from '../modules/artists/entities/artist.entity';

export class Database {
  public static readonly tracksTable = new Map<string, Track>();
  public static readonly usersTable = new Map<string, User>();
  public static readonly albumsTable = new Map<string, Album>();
  public static readonly artistsTable = new Map<string, Artist>();
}
