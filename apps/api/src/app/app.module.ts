import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { Comment } from './tickets/entities/comment.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from '../environments/environment';


function getDbConfig(): unknown {
  const dbConfig = {
    type: 'postgres',
    port: 5432,
    synchronize: true,
    logging: false,
    entities: [User, Ticket, Comment],
    subscribers: [],
    migrations: [],
  };
  let envDbConfig: unknown = {
    host: 'localhost',
    username: environment.dbConfig.username,
    password: environment.dbConfig.password,
    database: environment.dbConfig.dbname,
  };
  if (environment.production) {
    envDbConfig = {
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
  Object.assign(dbConfig, envDbConfig);
  return dbConfig;
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getDbConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
      exclude: ['/api*'],
    }),
    TicketsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
