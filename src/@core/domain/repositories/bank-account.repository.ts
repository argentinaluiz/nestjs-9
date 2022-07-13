import { BankAccount } from '../entities/bank-account.entity';
import UniqueEntityId from '../value-objects/unique-entity-id';

export interface BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void>;
  update(bankAccount: BankAccount): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<BankAccount>;
  findByAccountNumber(account_number: string): Promise<BankAccount>;
  findAll(): Promise<BankAccount[]>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
