import { randomUUID } from 'crypto';

export interface CreditCardProps {
  name: string;
  color: string;
  createdAt?: Date | null;
}

export class CreditCard {
  private _id: string;
  private props: CreditCardProps;

  constructor(props: CreditCardProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get color(): string {
    return this.props.color;
  }
}
