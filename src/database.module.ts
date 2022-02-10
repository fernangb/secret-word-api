import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5435,
      username: 'postgres',
      password: 'manosleague',
      database: 'secret-word',
      entities: [join(__dirname, 'domains', '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
