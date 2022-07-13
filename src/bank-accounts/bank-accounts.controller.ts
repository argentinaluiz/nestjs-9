import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { BankAccountService } from '../@core/application/bank-account.service';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  //constructor(private readonly bankAccountService: BankAccountService) {}
  constructor(private readonly bankAccountService: BankAccountsService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }

  @HttpCode(204)
  @Post('transfer')
  transfer(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountService.transfer(
      transferDto.account_number_src,
      transferDto.account_number_dest,
      transferDto.amount,
    );
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }

  // @Post()
  // create(@Body() createBankAccountDto: CreateBankAccountDto) {
  //   return this.bankAccountService.create(createBankAccountDto.account_number);
  // }

  // @Get()
  // findAll() {
  //   return this.bankAccountService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bankAccountService.findById(id);
  // }

  // @HttpCode(204)
  // @Post('transfer')
  // transfer(@Body() transferDto: TransferBankAccountDto) {
  //   return this.bankAccountService.transfer(
  //     transferDto.account_number_src,
  //     transferDto.account_number_dest,
  //     transferDto.amount,
  //   );
  // }

  // @HttpCode(204)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bankAccountService.delete(id);
  // }
}
