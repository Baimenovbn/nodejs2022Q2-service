import { Database } from '../../DB';
import { Favourite } from './entities/favourite.entity';

export class FavouritesRepository {
  static getAll() {
    return Database.favouritesTable;
  }

  static addToFavourites(id: string, favouriteType: keyof Favourite) {
    Database.favouritesTable[favouriteType].add(id);
  }

  static removeFromFavourites(id: string, favouriteType: keyof Favourite) {
    Database.favouritesTable[favouriteType].delete(id);
  }
}
