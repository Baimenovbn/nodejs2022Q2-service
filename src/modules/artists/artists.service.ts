import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { PrismaService } from '../prisma/prisma.service';
import { invalidForeignKeyWrapper } from '../../utils/invalid-foreign-key-wrapper';

@Injectable()
export class ArtistsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateArtistDto) {
    return invalidForeignKeyWrapper(() =>
      this.prismaService.artist.create({ data }),
    );
  }

  findAll() {
    return this.prismaService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new ResourceNotFoundError('Artist');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    return invalidForeignKeyWrapper(() =>
      this.prismaService.artist.update({
        where: { id: artist.id },
        data: updateArtistDto,
      }),
    );
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.prismaService.artist.delete({ where: { id: artist.id } });
  }
}
