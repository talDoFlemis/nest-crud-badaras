import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTobaianorDto } from './dto/create-tobaianor.dto';
import { UpdateTobaianorDto } from './dto/update-tobaianor.dto';
import { Tobaianor } from './entities/tobaianor.entity';

@Injectable()
export class TobaianorService {
  constructor(
    @InjectRepository(Tobaianor)
    private tobaianoRepository: Repository<Tobaianor>,
  ) {}

  create(createTobaianorDto: CreateTobaianorDto) {
    return this.tobaianoRepository.save(createTobaianorDto);
  }

  findAll() {
    return this.tobaianoRepository.find();
  }

  findOne(id: number) {
    return this.tobaianoRepository.findOneBy({ id });
  }

  update(id: number, updateTobaianorDto: UpdateTobaianorDto) {
    return this.tobaianoRepository.update(id, updateTobaianorDto);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.tobaianoRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
