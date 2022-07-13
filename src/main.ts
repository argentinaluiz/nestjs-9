import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ContextIdByTenantStrategy } from './durable-providers/context-id-by-tenant.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ContextIdFactory.apply(new ContextIdByTenantStrategy());
  await app.listen(3000);
}
bootstrap();
