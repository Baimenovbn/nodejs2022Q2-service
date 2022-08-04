import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateUuidParam } from '../../models/pipes/validate-uuid.param';
import { AuthGuard } from '@nestjs/passport';

@Controller('track')
@UseGuards(AuthGuard('jwt'))
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidateUuidParam) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: ValidateUuidParam,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidateUuidParam) {
    return this.tracksService.remove(id);
  }
}
