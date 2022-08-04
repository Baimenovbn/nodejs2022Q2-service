import { Controller, Post, Param, Get, Delete, HttpCode } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { ValidateUuidParam } from '../../models/pipes/validate-uuid.param';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Post('track/:id')
  addTrackById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.addToFavourites(id, 'tracks');
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.removeFromFavourites(id, 'tracks');
  }

  @Post('album/:id')
  addAlbumById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.addToFavourites(id, 'albums');
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.removeFromFavourites(id, 'albums');
  }

  @Post('artist/:id')
  addArtistById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.addToFavourites(id, 'artists');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistById(@Param() { id }: ValidateUuidParam) {
    return this.favouritesService.removeFromFavourites(id, 'artists');
  }
}
