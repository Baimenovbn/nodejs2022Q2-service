import { HttpException, Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    try {
      return AlbumsRepository.create(createAlbumDto);
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.NOT_FOUND);
    }
  }

  findAll() {
    return AlbumsRepository.getAll();
  }

  findOne(id: string) {
    const album = AlbumsRepository.getById(id);
    if (!album) throw new ResourceNotFoundError('Album');
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

    try {
      return AlbumsRepository.update(id, {
        ...album,
        ...updateAlbumDto,
      });
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.NOT_FOUND);
    }
  }

  remove(id: string) {
    const album = this.findOne(id);
    return AlbumsRepository.removeById(album.id);
  }
}
