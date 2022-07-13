import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { DataSource } from 'typeorm';
//import { BankAccount } from '../@core/domain/entities/bank-account.entity';
import { BankAccountService } from '../@core/application/bank-account.service';
import { BankAccountRepository } from '../@core/domain/repositories/bank-account.repository';
import { BankAccount } from './entities/bank-account.entity';

@Module({
  //imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    // {
    //   provide: BankAccountTypeOrmRepository,
    //   useFactory: (dataSource: DataSource) => {
    //     return new BankAccountTypeOrmRepository(
    //       dataSource.getRepository(BankAccount),
    //     );
    //   },
    //   inject: [getDataSourceToken()],
    // },
    // {
    //   provide: BankAccountService,
    //   useFactory(repository: BankAccountRepository) {
    //     return new BankAccountService(repository);
    //   },
    //   inject: [BankAccountTypeOrmRepository],
    // },
  ],
})
export class BankAccountsModule {}
