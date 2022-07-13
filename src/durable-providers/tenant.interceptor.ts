import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant/tenant.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {

  constructor(private tenantService: TenantService) {
    console.log('tenant interceptor constructor');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'] as string;
    this.tenantService.id = tenantId;
    return next.handle();
  }
}
