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
import { LoggerModule } from './modules/logger/logger.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    AlbumsModule,
    ArtistsModule,
    AuthModule,
    FavouritesModule,
    TracksModule,
    UsersModule,
    LoggerModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
