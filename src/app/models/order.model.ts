import { _Order } from '../interfaces/order.interfaces';

export class Order {
  constructor(
    public client: any,
    public createAt: string,
    public order: number,
    public product: string,
    public provider: string,
    public reason: string,
    public servedBy: any,
    public status: string,
    public type?: string,
    public _id?: string
  ) {}
}

export class Dashboard {
  public orders!: _Order[];
  public total!: number;
  public pending!: number;
  constructor() {}
}
