import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';
//import { UpdateBankAccountDto } from './dto/transfer-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountModel: Repository<BankAccount>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.bankAccountModel.create({
      balance: 0,
      ...createBankAccountDto,
    });
    await this.bankAccountModel.insert(bankAccount);
    return bankAccount;
  }

  findAll() {
    return this.bankAccountModel.find();
  }

  findOne(id: string) {
    return this.bankAccountModel.findOneBy({ id });
  }

  async transfer(
    account_number_src_id: string,
    account_number_dest_id: string,
    amount: number,
  ) {
    const bankAccountSrc = await this.bankAccountModel.findOneBy({
      account_number: account_number_src_id,
    });
    const bankAccountDest = await this.bankAccountModel.findOneBy({
      account_number: account_number_dest_id,
    });

    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);

    await this.bankAccountModel.save(bankAccountSrc);
    await this.bankAccountModel.save(bankAccountDest);
  }

  remove(id: string) {
    return this.bankAccountModel.delete(id);
  }
}
