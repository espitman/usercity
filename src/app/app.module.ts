import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as config from 'config'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResponseInterceptor } from '../interceptors/response/response.interceptor'
import { UserModule } from '../entities/user/user.module'
import { UserController } from '../api/v1/user/user.controller'
import { UserService } from '../entities/user/user.service'

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${config.get('database.user')}:${config.get(
        'database.password'
      )}@${config.get('database.host')}:${config.get(
        'database.port'
      )}/${config.get('database.database')}`
    ),
    UserModule
  ],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
