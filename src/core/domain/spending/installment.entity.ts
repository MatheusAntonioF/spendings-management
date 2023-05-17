import { InvalidException } from './exceptions/invalid-installment.exception';

export interface InstallmentProps {
  currentInstallment: number;
  totalInstallments: number;
}

export class Installment {
  private props: InstallmentProps;

  constructor(props: InstallmentProps) {
    if (!this.isValidInstallment(props)) {
      throw new InvalidException('Invalid installment');
    }

    this.props = props;
  }

  private isValidInstallment(installment: InstallmentProps): boolean {
    return installment.currentInstallment <= installment.totalInstallments;
  }

  get currentInstallment(): number {
    return this.props.currentInstallment;
  }

  get totalInstallments(): number {
    return this.props.totalInstallments;
  }
}
