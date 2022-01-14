import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@/config/config.service';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      ...configService.config.database,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: true,
      charset: 'utf8mb4',
    }),
    inject: [ConfigService],
  }),
];
