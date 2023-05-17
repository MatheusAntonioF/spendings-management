import { InvalidException } from './exceptions/invalid-installment.exception';
import { Installment } from './installment.entity';

describe('installment entity', () => {
  it('should be able to create a valid installment', () => {
    const installment = new Installment({
      currentInstallment: 1,
      totalInstallments: 2,
    });

    expect(installment.currentInstallment).toEqual(1);
    expect(installment.totalInstallments).toEqual(2);
  });

  it('should not be able to create an installment with current installment greater than total installments', () => {
    expect(() => {
      new Installment({
        currentInstallment: 3,
        totalInstallments: 2,
      });
    }).toThrow(InvalidException);
  });
});
