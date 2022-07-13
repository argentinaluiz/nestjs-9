import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();

//$(BankAccountsController)
//debug - mostra tudo
//get === $()
//help()
//methods - mostrar metodos de um provider ou controller

//await import('./dist/@core/domain/entities/bank-account.entity.js');
//BankAccount = await import('./dist/@core/domain/entities/bank-account.entity.js').then(m => m.BankAccount)

//select(BankAccountsModule).get(BankAccountService) => INestApplicationContext
///@nestjs/common/interfaces/nest-application-context.interface.d.ts
