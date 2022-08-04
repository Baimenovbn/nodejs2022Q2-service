import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidateUuidParam } from '../../models/pipes/validate-uuid.param';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidateUuidParam) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param() { id }: ValidateUuidParam,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidateUuidParam) {
    return this.artistsService.remove(id);
  }
}
