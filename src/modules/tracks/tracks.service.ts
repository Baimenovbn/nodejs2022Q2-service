import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { TracksRepository } from './tracks.repository';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    try {
      return TracksRepository.create(createTrackDto);
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.NOT_FOUND);
    }
  }

  findAll() {
    return TracksRepository.getAll();
  }

  findOne(id: string) {
    const track = TracksRepository.getById(id);
    if (!track) throw new ResourceNotFoundError('Track');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);

    try {
      return TracksRepository.update(id, {
        ...track,
        ...updateTrackDto,
      });
    } catch (e) {
      throw new HttpException(e.message, StatusCodes.NOT_FOUND);
    }
  }

  remove(id: string) {
    const track = this.findOne(id);
    return TracksRepository.removeById(track.id);
  }
}
