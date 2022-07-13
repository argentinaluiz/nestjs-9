import { BankAccount } from '../entities/bank-account.entity';

export class OpenBankAccountFromOld {
  static open(bankAccountOld: BankAccount, account_number: string) {
    const newBankAccount = BankAccount.create({
      balance: bankAccountOld.balance,
      account_number,
    });
    bankAccountOld.debit(bankAccountOld.balance);
    return newBankAccount;
  }
}
