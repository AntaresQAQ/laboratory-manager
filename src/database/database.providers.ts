import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/config/config.service';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      type: configService.config.database.type,
      host: configService.config.database.host,
      port: configService.config.database.port,
      username: configService.config.database.username,
      password: configService.config.database.password,
      database: configService.config.database.database,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      logging: configService.config.database.logging,
      synchronize: true,
      charset: 'utf8mb4',
    }),
    inject: [ConfigService],
  }),
];
