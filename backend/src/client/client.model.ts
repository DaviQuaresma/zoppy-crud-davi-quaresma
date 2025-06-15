import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Client extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  company: string;

  @Column
  cep: string;

  @Column
  cnpj: string;
}
