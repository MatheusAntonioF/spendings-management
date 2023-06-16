import { ExistentCategoryProps } from './category.entity';
import { InstallmentProps } from './installment.entity';

export interface SpendingProps {
  name: string;
  price: number;
  purchaseDate: Date;
  installment: InstallmentProps;
  category: ExistentCategoryProps;
  createdAt?: Date | null;
  creditCardInvoiceId?: string | null;
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

  get purchaseDate(): Date {
    return this.props.purchaseDate;
  }

  get price(): number {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get category(): ExistentCategoryProps {
    return this.props.category;
  }

  get creditCardInvoiceId(): string | null {
    return this.props.creditCardInvoiceId;
  }

  set creditCardInvoiceId(data: string) {
    this.props.creditCardInvoiceId = data;
  }
}
