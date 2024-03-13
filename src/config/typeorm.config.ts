import { type TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'

// Load environment variables from .env file into process.env
dotenv.config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true
}
