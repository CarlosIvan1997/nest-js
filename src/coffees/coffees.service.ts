import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name)
    private readonly coffeeModel: Model<Coffee>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const coffees = await this.coffeeModel.find().skip(offset).limit(limit);
    return coffees;
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id });
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    const savedCoffee = await coffee.save();
    return savedCoffee;
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    const removedCoffee = await coffee.remove();
    return removedCoffee;
  }
}
