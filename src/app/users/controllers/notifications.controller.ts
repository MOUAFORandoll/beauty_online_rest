import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GeneralNotificationDto, ParticularNotificationDto } from '../dto';
import * as Database from '../../../databases/users/providers';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import { Public } from 'src/common/apiutils/api.decorators';
import { NotificationsService } from '../providers/notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly dbUsersService: Database.UsersService,
        private readonly sendNotificationsService: SendNotificationsService,
    ) {}
    /**
     * Sends a welcome notification to a user by their ID
     */
    @Get('/welcome')
    @Public()
    @ApiOperation({
        summary: 'Sends a welcome notification to a user by their ID',
    })
    @HttpCode(HttpStatus.OK)
    async sendWelcomeNotification(@Query('userId') userId: string) {
        await this.notificationsService.welComeNotification(userId);
    }

    /**
     * Sends a general notification to all users
     */
    @Post('/generale')
    @Public()
    @ApiOperation({
        summary: 'Sends a general notification to all users',
    })
    @HttpCode(HttpStatus.OK)
    async sendGeneralNotification(@Body() body: GeneralNotificationDto) {
        await this.notificationsService.generaleNotification(body.message);
    }

    /**
     * Sends a notification to a specific user by their ID
     */
    @Post('/user')
    @ApiOperation({
        summary: 'Sends a notification to a specific user by their ID',
    })
    @Public()
    @HttpCode(HttpStatus.OK)
    async sendNotificationToUser(@Body() body: ParticularNotificationDto) {
        await this.notificationsService.sendNotiftoUser(body.userId, body.message);
    }
}
