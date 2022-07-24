import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ResourceNotFoundError } from '../../models/errors/resource-not-found.error';
import { CreateAlbumDto } from './dto/create-album.dto';
import { invalidForeignKeyWrapper } from '../../utils/invalid-foreign-key-wrapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAlbumDto) {
    return invalidForeignKeyWrapper(() =>
      this.prismaService.album.create({ data }),
    );
  }

  findAll() {
    return this.prismaService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prismaService.album.findUnique({ where: { id } });
    if (!album) throw new ResourceNotFoundError('Album');
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    return invalidForeignKeyWrapper(() =>
      this.prismaService.album.update({
        where: { id: album.id },
        data: updateAlbumDto,
      }),
    );
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    return this.prismaService.album.delete({ where: { id: album.id } });
  }
}
