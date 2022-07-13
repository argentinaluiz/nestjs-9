import { EntitySchema } from 'typeorm';
import { BankAccount } from '../../domain/entities/bank-account.entity';

export const BankAccountSchema = new EntitySchema<BankAccount>({
  name: 'bank_account',
  target: BankAccount,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    balance: {
      type: 'decimal',
      scale: 2,
    },
    account_number: {
      type: String,
      length: 255,
    },
  },
});
