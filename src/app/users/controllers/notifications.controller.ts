import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GeneralNotificationDto, NotificationResponseDto, ParticularNotificationDto } from '../dto';

import { Public } from 'src/common/apiutils/api.decorators';
import { NotificationsService } from '../providers/notifications.service';
import { GetUser } from '../decorators';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import {
    AGENDA_MODEL_NAME,
    AgendaModel,
    DATABASE_CONNECTION,
    REALISATION_MODEL_NAME,
    RealisationModel,
    REALISATION_FILE_MODEL_NAME,
    USER_MODEL_NAME,
    UserModel,
    RealisationFileModel,
    CRENEAU_MODEL_NAME,
    CreneauModel,
    PositionModel,
    POSITION_MODEL_NAME,
    RendezVousModel,
    RENDEZ_VOUS_MODEL_NAME,
    PROFILE_PRO_MODEL_NAME,
    ProfileProfessionnelModel,
    REALISATION_VIDEO_MODEL_NAME,
    RealisationVideoModel,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        @InjectModel(USER_MODEL_NAME, DATABASE_CONNECTION)
        private readonly userModel: UserModel,
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,
        @InjectModel(REALISATION_VIDEO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationVideoModel: RealisationVideoModel,

        @InjectModel(CRENEAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly creneauModel: CreneauModel,

        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,
        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,
        private readonly configService: ConfigService,
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

    /**
     *
     *  Récupère un utilisateur par son ID
     */
    @Get('/me')
    @ApiOperation({
        summary: 'Retrieves a user by their  token',
    })
    @ApiOkResponse({ type: NotificationResponseDto })
    @HttpCode(HttpStatus.OK)
    async findUserNotification(
        @GetUser('id') userId: string,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<NotificationResponseDto>> {
        const { data, total } = await this.notificationsService.findUserNotification(
            userId,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            NotificationResponseDto.fromNotification(l, {
                rendezVousModel: this.rendezVousModel,
                userModel: this.userModel,
                agendaModel: this.agendaModel,
                realisationModel: this.realisationModel,
                realisationFileModel: this.realisationFileModel,
                realisationVideoModel: this.realisationVideoModel,
                creneauModel: this.creneauModel,
                profileModel: this.profileModel,
                positionModel: this.positionModel,
                configService: this.configService,
            }),
        );
    }
}
