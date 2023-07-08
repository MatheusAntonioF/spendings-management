import { randomUUID } from 'crypto';
import { Spending } from './spending.entity';

export interface CategoryProps {
  name: string;
  color: string;
  keyMapping: string[];
  spendings?: Spending[];
  createdAt?: Date;
}

export class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(props: CategoryProps, id?: string) {
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

  set color(color: string) {
    this.props.color = color;
  }

  get keyMapping(): string[] {
    return this.props.keyMapping;
  }

  set keyMapping(keyMapping: string[]) {
    this.props.keyMapping = [...this.props.keyMapping, ...keyMapping];
  }

  get spendings(): Spending[] {
    return this.props.spendings || [];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
