// import { Command, CommandFactory, CommandRunner } from 'nest-commander';
// import { Logger, Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { CreateSubscriptionPlansMigration } from './2025_03_19_create_subscription_plans.migration';
// import { BaseMigration } from './base.migration';
// import { MainDatabaseModule } from '../databases/main/main.database.module';

// @Command({
//     name: 'migrate',
//     description: 'run a migration script',
//     arguments: '<migration>',
//     options: { isDefault: true },
// })
// export class MigrationApp extends CommandRunner {
//     constructor(
//         private readonly createSubscriptionPlansMigration: CreateSubscriptionPlansMigration,
//     ) {
//         super();
//     }

//     async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
//         const migrationName = passedParams[0];
//         let migration: BaseMigration;
//         switch (migrationName) {
//             case CreateSubscriptionPlansMigration.migrationName:
//                 migration = this.createSubscriptionPlansMigration;
//                 break;
//             default:
//                 throw new Error('Invalid migration name, aborting.');
//         }

//         return migration.execute().then(function() {
//             console.log("Migration executed successfully.");
//         });
//     }
// }

// @Module({
//     imports: [
//         ConfigModule.forRoot({
//             isGlobal: true,
//             envFilePath: '.env',
//         }),
//         MainDatabaseModule,
//     ],
//     providers: [
//         Logger,
//         MigrationApp,
//         CreateSubscriptionPlansMigration
//     ],
// })
// class MigrationAppModule {}

// void CommandFactory.run(
//     MigrationAppModule,
//     { logger: ['warn', 'error'] },
// );
