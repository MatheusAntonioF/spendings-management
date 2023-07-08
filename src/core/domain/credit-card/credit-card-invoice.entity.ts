import { randomUUID } from 'crypto';
import { Spending } from '../spending/spending.entity';
import { CreditCard } from './credit-card.entity';

export interface CreditCardInvoiceProps {
  creditCard: CreditCard;
  date: Date;
  spendings: Spending[];
  createdAt?: Date | null;
}

export class CreditCardInvoice {
  private _id: string;
  private props: CreditCardInvoiceProps;

  constructor(props: CreditCardInvoiceProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  get id(): string {
    return this._id;
  }

  get creditCard(): CreditCard {
    return this.props.creditCard;
  }

  get date(): Date {
    return this.props.date;
  }

  get spendings(): Spending[] {
    return this.props.spendings;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  addSpending(data: Spending) {
    this.props.spendings = [...this.props.spendings, data];
  }
}
