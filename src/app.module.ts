import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AlbumsModule,
  ArtistsModule,
  TracksModule,
  UsersModule,
  FavouritesModule,
} from './modules';

@Module({
  imports: [
    FavouritesModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
