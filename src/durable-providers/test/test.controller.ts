import { Controller, Get, Req } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';

@Controller('test')
export class TestController {
  constructor(
    private connection: ConnectionService,
    private moduleRef: ModuleRef,
  ) {
    console.log('test controller constructor');
  }

  @Get()
  async test(@Req() req) {
    // const contextId = ContextIdFactory.create();
    // const conn1 = await this.moduleRef.resolve(ConnectionService, contextId);
    // const conn2 = await this.moduleRef.resolve(ConnectionService, contextId);
    const contextId = ContextIdFactory.getByRequest(req);
    const conn1 = await this.moduleRef.resolve(ConnectionService, contextId);
    const conn2 = await this.moduleRef.resolve(ConnectionService, contextId);
    console.log(conn1 === conn2);
    return 'Test';
  }
}
