import { CreditCard } from './credit-card.entity';

describe('credit card entity', () => {
  it('should be able to create a new credit card', () => {
    const creditCard = new CreditCard({
      name: 'random card',
      color: '#7159c1',
    });

    expect(creditCard.id).toBeTruthy();
    expect(creditCard.name).toEqual('random card');
    expect(creditCard.color).toEqual('#7159c1');
  });
});
