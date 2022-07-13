import { Repository } from 'typeorm';
import { BankAccount } from '../../domain/entities/bank-account.entity';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import UniqueEntityId from '../../domain/value-objects/unique-entity-id';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccount>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.save(bankAccount);
  }
  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.uniqueId.value, bankAccount.props);
  }
  findById(id: string | UniqueEntityId): Promise<BankAccount> {
    const _id = typeof id === 'string' ? id : id.value;
    return this.ormRepo.findOne({ where: { id: _id } });
  }

  findByAccountNumber(account_number: string): Promise<BankAccount> {
    return this.ormRepo.findOneBy({ account_number });
  }

  findAll(): Promise<BankAccount[]> {
    return this.ormRepo.find();
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = typeof id === 'string' ? id : id.value;
    await this.ormRepo.delete(_id);
  }
}
