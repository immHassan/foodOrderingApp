import { Dish } from 'src/dishes/dish.entity';
import { Order } from 'src/orders/order.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Dish } from '../dishes/dish.entity';

@Entity()
export class Foodie {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: null })
  image: string;


  @OneToMany(() => Order, (order) => order.foodie)
  order: Order[]

  @Column({ default: true })
  isActive: boolean;



  //   @OneToMany(type => Photo, photo => Dish.createdBy)
  //   photos: Photo[];
}