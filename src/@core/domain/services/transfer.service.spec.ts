import { BankAccount } from '../entities/bank-account.entity';
import { Transfer } from './transfer.service';

describe('TransferService Unit Tests', () => {
  it('should transfer between bank accounts', () => {
    const bankAccountSrc = BankAccount.create({
      account_number: '1111-11',
      balance: 0,
    });
    const bankAccountDest = BankAccount.create({
      account_number: '2222-22',
      balance: 0,
    });
    bankAccountSrc.credit(100);
    bankAccountDest.credit(100);
    Transfer.transfer(bankAccountSrc, bankAccountDest, 50);
    expect(bankAccountSrc.balance).toBe(50);
    expect(bankAccountDest.balance).toBe(150);
  });
});
