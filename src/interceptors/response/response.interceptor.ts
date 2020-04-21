import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadGatewayException,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method } = context.switchToHttp().getRequest()
    const status = method === 'POST' ? HttpStatus.CREATED : HttpStatus.OK
    return next.handle().pipe(
      map(res => {
        return {
          status,
          payload: res,
          message: 'Ok'
        }
      })
    )
  }
}
