// import { Injectable } from '@nestjs/common';
// import {
//     DATABASE_CONNECTION,
//     SUBSCRIPTION_PLAN_MODEL_NAME,
//     SubscriptionPlanModel,
// } from '../databases/main/main.database.connection';
// import { InjectModel } from '@nestjs/mongoose';
// import { BaseMigration } from './base.migration';
// import { AnalyticsRange, StatisticType } from '../links/dto';

// @Injectable()
// export class CreateSubscriptionPlansMigration implements BaseMigration {
//     static readonly migrationName: string = 'CreateSubscriptionPlansMigration';

//     constructor(
//         @InjectModel(SUBSCRIPTION_PLAN_MODEL_NAME, DATABASE_CONNECTION)
//         private readonly subscriptionPlanModel: SubscriptionPlanModel,
//     ) {}

//     async execute(): Promise<void> {
//         const indiePlan = new this.subscriptionPlanModel({
//             position: 1,
//             name: 'Indie Tier',
//             applicationCount: 5,
//             clicksPerMonth: 10000,
//             analyticsDaysRange: 30,
//             customDomains: false,
//             analytics: [
//                 AnalyticsRange.lastHour,
//                 AnalyticsRange.last12Hours,
//                 AnalyticsRange.lastDay,
//                 AnalyticsRange.lastWeek,
//                 AnalyticsRange.lastMonth,
//             ],
//             statistics: [
//                 StatisticType.total,
//                 StatisticType.countries,
//             ],
//             links: {
//                 maximumSegments: 3,
//                 maximumCustomParams: 2
//             },
//             prioritySupport: false,
//         });
//         const proPlan = new this.subscriptionPlanModel({
//             position: 2,
//             name: 'Professional Tier',
//             applicationCount: -1,
//             clicksPerMonth: 50000,
//             analyticsDaysRange: -1,
//             customDomains: true,
//             analytics: Object.values(AnalyticsRange),
//             statistics: Object.values(StatisticType),
//             links: {
//                 maximumSegments: -1,
//                 maximumCustomParams: -1
//             },
//             prioritySupport: false,
//         });
//         const businessPlan = new this.subscriptionPlanModel({
//             position: 3,
//             name: 'Enterprise Tier',
//             applicationCount: -1,
//             clicksPerMonth: -1,
//             analyticsDaysRange: -1,
//             customDomains: true,
//             analytics: Object.values(AnalyticsRange),
//             statistics: Object.values(StatisticType),
//             links: {
//                 maximumSegments: -1,
//                 maximumCustomParams: -1
//             },
//             prioritySupport: true,
//         });

//         await Promise.allSettled([indiePlan.save(), proPlan.save(), businessPlan.save()]);
//     }
// }
