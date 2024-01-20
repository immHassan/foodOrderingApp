import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 6, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 6, scale: 2 })
  totalAmount: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
  
  
}