import { Test, TestingModule } from '@nestjs/testing';
import { FoodiesController } from './foodies.controller';

describe('FoodiesController', () => {
  let controller: FoodiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodiesController],
    }).compile();

    controller = module.get<FoodiesController>(FoodiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
