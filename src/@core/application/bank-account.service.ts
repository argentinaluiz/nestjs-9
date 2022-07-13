import { BankAccount } from '../domain/entities/bank-account.entity';
import { BankAccountRepository } from '../domain/repositories/bank-account.repository';
import { OpenBankAccountFromOld } from '../domain/services/open-bank-account-from-old.service';
import { Transfer } from '../domain/services/transfer.service';

export class BankAccountService {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async create(account_number: string) {
    const bankAccount = BankAccount.create({ balance: 0, account_number });
    await this.bankAccountRepo.insert(bankAccount);
    return bankAccount;
  }

  async transfer(
    accountNumberSrc: string,
    accountNumberDest: string,
    amount: number,
  ) {
    const bankAccountSrc = await this.bankAccountRepo.findByAccountNumber(
      accountNumberSrc,
    );
    const bankAccountDest = await this.bankAccountRepo.findByAccountNumber(
      accountNumberDest,
    );

    Transfer.transfer(bankAccountSrc, bankAccountDest, amount);

    //unit of work
    await this.bankAccountRepo.update(bankAccountSrc);
    await this.bankAccountRepo.update(bankAccountDest);

    //this.unitOfWork.commit();
  }

  async openFromOld(oldBankAccountId: string, new_account_number: string) {
    const oldBankAccount = await this.bankAccountRepo.findById(
      oldBankAccountId,
    );

    const newBankAccount = OpenBankAccountFromOld.open(
      oldBankAccount,
      new_account_number,
    );

    await this.bankAccountRepo.update(oldBankAccount);
    await this.bankAccountRepo.insert(newBankAccount);

    return newBankAccount;
  }

  findAll() {
    return this.bankAccountRepo.findAll();
  }

  findById(id: string) {
    return this.bankAccountRepo.findById(id);
  }

  delete(id: string) {
    return this.bankAccountRepo.delete(id);
  }
}
