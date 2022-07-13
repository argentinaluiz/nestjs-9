import { BankAccount } from './bank-account.entity';
import { validate as uuidValidate } from 'uuid';
import UniqueEntityId from '../value-objects/unique-entity-id';
describe('BankAccount Unit Tests', () => {
  test('constructor', () => {
    let bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });

    expect(uuidValidate(bankAccount.uniqueId.value)).toBeTruthy();
    expect(bankAccount.balance).toBe(0);
    expect(bankAccount.account_number).toBe('1111-11');

    bankAccount = BankAccount.create(
      {
        balance: 10,
        account_number: '2222-22',
      },
      new UniqueEntityId(),
    );

    expect(bankAccount.uniqueId).toBeInstanceOf(UniqueEntityId);
    expect(bankAccount.balance).toBe(10);
    expect(bankAccount.account_number).toBe('2222-22');
  });
});
