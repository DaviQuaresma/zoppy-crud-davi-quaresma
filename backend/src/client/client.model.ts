import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Client extends Model {
  @Column
  name: string;

  @Column
  email: string;
}
