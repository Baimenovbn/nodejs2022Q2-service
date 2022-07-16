import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateUuidParam } from '../../models/pipes/validate-uuid.param';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Track {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll(): Track[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: ValidateUuidParam): Track {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: ValidateUuidParam,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: ValidateUuidParam) {
    return this.tracksService.remove(id);
  }
}
