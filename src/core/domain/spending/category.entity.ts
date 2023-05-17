export interface CategoryProps {
  name: string;
  color: string;
}

export class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(props: CategoryProps, id?: string) {
    this._id = id;
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get color(): string {
    return this.props.color;
  }

  set color(color: string) {
    this.props.color = color;
  }
}
