import { TypeOrmModule } from '@nestjs/typeorm';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mariadb',
      host: "127.0.0.1",
      port: 3306,
      username: "Antares",
      password: "020830",
      database: "lab_mgr",
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      logging: true,
      charset: 'utf8mb4',
      synchronize: true,
    }),
  }),
];
