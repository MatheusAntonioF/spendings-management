import { CategoryProps } from './category.entity';
import { InstallmentProps } from './installment.entity';

export interface SpendingProps {
  name: string;
  price: number;
  purchaseDate: Date;
  installment: InstallmentProps;
  category: CategoryProps;
  createdAt?: Date | null;
}

export class Spending {
  private _id: string;
  private props: SpendingProps;

  constructor(props: SpendingProps, id?: string) {
    this._id = id;
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get price(): number {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get category(): CategoryProps {
    return this.props.category;
  }
}
