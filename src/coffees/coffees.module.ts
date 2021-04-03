import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

// class MockCoffeesService {} CASE_1

// class ConfigService {} CASE_2
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable() CASE_4
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,

    // { provide: CoffeesService, useValue: new MockCoffeesService() }, CASE_1

    // { CASE_2
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },

    // { CASE_3
    //   provide: COFFEE_BRANDS, // 👈
    //   useValue: ['buddy brew', 'nescafe'], // array of coffee brands,
    // },

    // CoffeeBrandsFactory, CASE_4
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (coffeeBrandsFactory: CoffeeBrandsFactory) =>
    //     coffeeBrandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },

    // { CASE_5
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
