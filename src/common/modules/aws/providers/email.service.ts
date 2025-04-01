// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

// @Injectable()
// export class EmailService {
//     private readonly sesClient: SESClient;
//     private readonly senderEmail: string;
//     private readonly senderName: string;

//     constructor(private readonly configService: ConfigService) {
//         this.sesClient = new SESClient({
//             credentials: {
//                 accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
//                 secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET')
//             },
//             region: this.configService.get<string>('AWS_REGION'),
//         });
//         this.senderEmail = this.configService.get<string>('AWS_SES_SENDER_EMAIL');
//         this.senderName = this.configService.get<string>('AWS_SES_SENDER_NAME');
//     }

//     async sendSingleMail(
//         recipient: string,
//         subject: string,
//         content: string
//     ): Promise<void> {
//         await this.sesClient.send(new SendEmailCommand({
//             Destination: { ToAddresses: [recipient] },
//             Message: {
//                 Body: {
//                     Html: {
//                         Data: content
//                     },
//                 },
//                 Subject: { Data: subject },
//             },
//             Source: `${this.senderName} <${this.senderEmail}>`,
//         }));
//     }

//     async sendBulkMails(
//         recipients: string[],
//         subject: string,
//         content: string
//     ): Promise<void> {
//         for (const recipient of recipients) {
//             try {
//                 await this.sendSingleMail(recipient, subject, content);
//                 await this.delay(500);
//             } catch { /* empty */ }
//         }
//     }

//     private delay(ms: number): Promise<void> {
//         return new Promise((resolve) => setTimeout(resolve, ms));
//     }
// }