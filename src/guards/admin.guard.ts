import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import * as config from 'config'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      headers: { authorization }
    } = context.switchToHttp().getRequest()
    const auth = authorization.replace('Bearer ', '')
    if (auth !== config.get('sampleToken')) {
      return false
    }
    return true
  }
}
