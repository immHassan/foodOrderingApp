import { Foodie } from '../foodies/foodie.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderItems } from './orderItems.entity';

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deliveryAddress: string;

  
  @Column()
  deliveryPhoneNumber: string;

  @ManyToOne(() => Foodie, (foodie) => foodie.order)
  foodie: Foodie;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];

  @Column('decimal', { precision: 6, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}


export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}
