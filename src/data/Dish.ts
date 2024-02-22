import { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
  dish_id: number;
  name: string;
  description: string | null;
  category: string;
  image: string;
  ingredients: object | null;
  diet: string | null;
  contains: string | null;
  price: number;
}
