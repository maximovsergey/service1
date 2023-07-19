import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostgresModule } from 'nest-postgres';

@Module({
  imports: [
    PostgresModule.forRoot({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1qazZAQ!',
      database: 'NEST',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
