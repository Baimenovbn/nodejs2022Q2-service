import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { PrismaService } from '../prisma/prisma.service';
import { invalidForeignKeyWrapper } from '../../utils/invalid-foreign-key-wrapper';

@Injectable()
export class TracksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTrackDto) {
    return invalidForeignKeyWrapper(() =>
      this.prismaService.track.create({ data }),
    );
  }

  findAll() {
    return this.prismaService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    if (!track) throw new ResourceNotFoundError('Track');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    return invalidForeignKeyWrapper(() =>
      this.prismaService.track.update({
        where: { id: track.id },
        data: updateTrackDto,
      }),
    );
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return this.prismaService.track.delete({ where: { id: track.id } });
  }
}
