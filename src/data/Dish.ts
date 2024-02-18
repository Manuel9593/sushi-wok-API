import { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
  dish_id: number;
  name: string;
}
