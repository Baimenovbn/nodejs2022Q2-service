import { HttpException, Injectable } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';

import { Favourite } from './entities/favourite.entity';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

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
    private readonly prismaService: PrismaService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  async findAll() {
    const [artistIds, albumIds, trackIds] = await Promise.all([
      this.prismaService.favourites.findMany({
        where: { favouriteType: { equals: 'artists' } },
      }),
      this.prismaService.favourites.findMany({
        where: { favouriteType: { equals: 'albums' } },
      }),
      this.prismaService.favourites.findMany({
        where: { favouriteType: { equals: 'tracks' } },
      }),
    ]);

    const [artists, albums, tracks] = await Promise.all([
      this.prismaService.artist.findMany({
        where: {
          id: { in: artistIds.map((fav) => fav.id) },
        },
      }),
      this.prismaService.album.findMany({
        where: {
          id: { in: albumIds.map((fav) => fav.id) },
        },
      }),
      this.prismaService.track.findMany({
        where: {
          id: { in: trackIds.map((fav) => fav.id) },
        },
      }),
    ]);

    return {
      tracks,
      albums,
      artists,
    };
  }

  async addToFavourites(id: string, favouriteType: keyof Favourite) {
    const service = this.serviceMapper[favouriteType];

    try {
      const entity = await service.findOne(id);
      return await this.prismaService.favourites.create({
        data: {
          id: entity.id,
          favouriteType,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
  }

  async removeFromFavourites(id: string, favouriteType: keyof Favourite) {
    const service = this.serviceMapper[favouriteType];
    try {
      const entity = await service.findOne(id);
      return this.prismaService.favourites.delete({ where: { id: entity.id } });
    } catch (e) {
      throw new HttpException(
        `${e.resourceName} not in favourites`,
        StatusCodes.NOT_FOUND,
      );
    }
  }
}
