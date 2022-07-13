import { Module } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import { TestController } from './test/test.controller';
import { TenantService } from './tenant/tenant.service';

@Module({
  providers: [ConnectionService, TenantService],
  controllers: [TestController]
})
export class DurableProvidersModule {}
