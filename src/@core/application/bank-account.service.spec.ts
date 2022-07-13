import { DataSource, Repository } from 'typeorm';
import { BankAccount } from '../domain/entities/bank-account.entity';
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository';
import { BankAccountSchema } from '../infra/db/bank-account.schema';
import { BankAccountService } from './bank-account.service';

describe('BankAccountService Unit Tests', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccount>;
  let repository: BankAccountTypeOrmRepository;
  let bankAccountService: BankAccountService;

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
    bankAccountService = new BankAccountService(repository);
  });

  test('create method', async () => {
    const bankAccount = await bankAccountService.create('1111-11');
    expect(bankAccount.account_number).toBe('1111-11');
    expect(bankAccount.balance).toBe(0);

    const bankAccountFound = await repository.findById(bankAccount.id);
    expect(bankAccountFound.account_number).toBe('1111-11');
    expect(bankAccountFound.balance).toBe(0);
  });

  test('transfer method', async () => {
    let bankAccountSrc = BankAccount.create({
      account_number: '1111-11',
      balance: 100,
    });
    await repository.insert(bankAccountSrc);

    let bankAccountDest = BankAccount.create({
      account_number: '2222-22',
      balance: 100,
    });
    await repository.insert(bankAccountDest);

    await bankAccountService.transfer(
      bankAccountSrc.id,
      bankAccountDest.id,
      50,
    );

    bankAccountSrc = await repository.findById(bankAccountSrc.id);
    expect(bankAccountSrc.balance).toBe(50);

    bankAccountDest = await repository.findById(bankAccountSrc.id);
    expect(bankAccountDest.balance).toBe(50);
  });
});
