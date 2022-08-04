import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AlbumsModule,
  ArtistsModule,
  AuthModule,
  FavouritesModule,
  TracksModule,
  UsersModule,
} from './modules';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    AuthModule,
    FavouritesModule,
    TracksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
