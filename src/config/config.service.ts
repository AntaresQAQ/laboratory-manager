import { AppConfig } from '@/config/config.schema';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

export class ConfigService {
  readonly config: AppConfig;

  constructor() {
    const filePath = process.env.LAB_MGR_CONFIG_FILE;
    if (!filePath) {
      throw new Error(
        'Please specify configuration file with environment variable LAB_MGR_CONFIG_FILE',
      );
    }

    const config = load(readFileSync(filePath).toString());
    this.config = ConfigService.validateInput(config);
  }

  private static validateInput(inputConfig: unknown): AppConfig {
    const appConfig = plainToInstance(AppConfig, inputConfig);
    const errors = validateSync(appConfig, {
      validationError: {
        target: false,
      },
    });

    if (errors.length > 0) {
      throw new Error(`Config validation error: ${JSON.stringify(errors, null, 2)}`);
    }

    return appConfig;
  }
}
