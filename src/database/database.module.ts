import { Module } from '@nestjs/common';
import { databaseProvider } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),databaseProvider]
})
export class DatabaseModule {}
