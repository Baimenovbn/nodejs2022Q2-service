import { HttpException, Injectable } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';

import { FavouritesRepository } from './favourites.repository';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { Favourite } from './entities/favourite.entity';

type TFavouritesServices = AlbumsService | ArtistsService | TracksService;

@Injectable()
export class FavouritesService {
  private readonly serviceMapper: Record<keyof Favourite, TFavouritesServices> =
    {
      artists: this.artistsService,
      albums: this.albumsService,
      tracks: this.tracksService,
    };

  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  findAll() {
    const favouriteIds = FavouritesRepository.getAll();
    const artists = this.artistsService
      .findAll()
      .filter((a) => favouriteIds.artists.has(a.id));
    const albums = this.albumsService
      .findAll()
      .filter((a) => favouriteIds.albums.has(a.id));
    const tracks = this.tracksService
      .findAll()
      .filter((t) => favouriteIds.tracks.has(t.id));

    return {
      artists,
      albums,
      tracks,
    };
  }

  addToFavourites(id: string, favouriteType: keyof Favourite) {
    const service = this.serviceMapper[favouriteType];
    try {
      const entity = service.findOne(id);
      return FavouritesRepository.addToFavourites(entity.id, favouriteType);
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
  }

  removeFromFavourites(id: string, favouriteType: keyof Favourite) {
    const service = this.serviceMapper[favouriteType];
    try {
      const entity = service.findOne(id);
      return FavouritesRepository.removeFromFavourites(
        entity.id,
        favouriteType,
      );
    } catch (e) {
      throw new HttpException(
        `${e.resourceName} not in favourites`,
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
