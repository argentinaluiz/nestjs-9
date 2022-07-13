import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BankAccountSchema } from './@core/infra/db/bank-account.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import { DurableProvidersModule } from './durable-providers/durable-providers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'database.sqlite'),
      synchronize: true,
      logging: true,
      //entities: [BankAccountSchema],
      entities: [BankAccount]
    }),
    BankAccountsModule,
    DurableProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
