import { DataSource, Repository } from 'typeorm';
import { BankAccount } from '../../domain/entities/bank-account.entity';
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository';
import { BankAccountSchema } from './bank-account.schema';

describe('BankAccountTypeOrmRepository Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccount>;
  let repository: BankAccountTypeOrmRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [BankAccountSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccount);
    repository = new BankAccountTypeOrmRepository(ormRepo);
  });

  it('should insert a new bank account', async () => {
    const bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });
    await repository.insert(bankAccount);

    const bankAccountFound = await ormRepo.findOneBy({ id: bankAccount.id });
    expect(bankAccountFound.toJSON()).toStrictEqual(bankAccount.toJSON());
  });

  it('should update a bank account', async () => {
    const bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });
    await repository.insert(bankAccount);

    bankAccount.credit(100);

    await repository.update(bankAccount);

    const bankAccountFound = await ormRepo.findOneBy({ id: bankAccount.id });
    expect(bankAccountFound.toJSON()).toStrictEqual(bankAccount.toJSON());
  });

  it('should find a bank account by id', async () => {
    const bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });
    await repository.insert(bankAccount);

    const bankAccountFound = await repository.findById(bankAccount.id);
    expect(bankAccountFound.toJSON()).toStrictEqual(bankAccount.toJSON());
  });

  it('should get all bank accounts', async () => {
    const bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });
    await repository.insert(bankAccount);

    const bankAccounts = await repository.findAll();
    expect([bankAccount.toJSON()]).toStrictEqual([bankAccounts[0].toJSON()]);
  });

  it('should delete a bank account', async () => {
    const bankAccount = BankAccount.create({
      balance: 0,
      account_number: '1111-11',
    });
    await repository.insert(bankAccount);

    await repository.delete(bankAccount.id);

    const countBankAccounts = await ormRepo.count();
    expect(countBankAccounts).toBe(0);
  });
});
