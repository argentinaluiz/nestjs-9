import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { TenantService } from '../tenant/tenant.service';

@Injectable({ scope: Scope.REQUEST })
export class ConnectionService implements OnModuleInit {
  constructor(private tenantService: TenantService) {
    console.log('connection service constructor');
  }

  onModuleInit() {
    console.log('adfdfasdfasfaaaaaaaaaaaaa');
  }

  query(query: string, params: any[]): Promise<any> {
    console.log(this.tenantService.id);
    return null;
  }
}
