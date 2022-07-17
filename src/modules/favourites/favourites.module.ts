import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [TracksModule, AlbumsModule, ArtistsModule],
})
export class FavouritesModule {}
