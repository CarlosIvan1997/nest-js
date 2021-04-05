import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coffeesService.findOne(id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE) To set a static HttpCode
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return await this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return await this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coffeesService.remove(id);
  }
}
