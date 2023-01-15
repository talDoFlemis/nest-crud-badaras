import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { TobaianorService } from './tobaianor.service';
import { CreateTobaianorDto } from './dto/create-tobaianor.dto';
import { UpdateTobaianorDto } from './dto/update-tobaianor.dto';

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

@Controller('tobaianor')
@UsePipes(new ValidationPipe({ transform: true }))
export class TobaianorController {
  constructor(private readonly tobaianorService: TobaianorService) {}

  @Post()
  create(
    @Body()
    createTobaianorDto: CreateTobaianorDto,
  ) {
    return this.tobaianorService.create(createTobaianorDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll() {
    await timeout(500);
    return this.tobaianorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tobaianorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTobaianorDto: UpdateTobaianorDto,
  ) {
    return this.tobaianorService.update(+id, updateTobaianorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tobaianorService.remove(+id);
  }
}
