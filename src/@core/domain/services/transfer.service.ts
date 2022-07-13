import { BankAccount } from '../entities/bank-account.entity';

export class Transfer {
  static transfer(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);
  }
}
