// RendezVous.controller.ts
import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
    Patch,
    UseInterceptors,
    ClassSerializerInterceptor,
    BadRequestException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RendezVousResponseDto } from '../dto';
import { RendezVousService } from '../providers';
import { GetUser } from 'src/app/users/decorators';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
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
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ApiTags('RendezVous')
@ApiBearerAuth()
@Controller('rendez-vous')
@UseInterceptors(ClassSerializerInterceptor)
export class RendezVousController {
    constructor(
        private readonly rendezVousService: RendezVousService,
        @InjectModel(USER_MODEL_NAME, DATABASE_CONNECTION)
        private readonly userModel: UserModel,
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,
        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,

        @InjectModel(CRENEAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly creneauModel: CreneauModel,

        @InjectModel(PROFILE_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profileModel: ProfileProfessionnelModel,
        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,
        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new rendez-vous' })
    @ApiOkResponse({ type: RendezVousResponseDto })
    async create(
        @GetUser('id') userId: string,
        @Body() dto: CreateRendezVousDto,
    ): Promise<RendezVousResponseDto> {
        const rendezVous = await this.rendezVousService.create(dto, userId);
        return await RendezVousResponseDto.fromRendezVous(
            this.userModel,
            this.agendaModel,
            this.realisationModel,
            this.realisationFileModel,
            this.creneauModel,
            this.profileModel,
            this.rendezVousModel,
            this.positionModel,

            rendezVous,
        );
    }

    @Get('/me')
    @ApiOperation({ summary: 'Get all rendez-vous for current user' })
    @ApiOkResponse({ type: PaginationResponseDto<RendezVousResponseDto> })
    async findUserRendezVous(
        @GetUser('id') userId: string,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RendezVousResponseDto>> {
        const { data, total } = await this.rendezVousService.findUserRendezVous(userId, pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RendezVousResponseDto.fromRendezVous(
                this.userModel,
                this.agendaModel,
                this.realisationModel,
                this.realisationFileModel,
                this.creneauModel,
                this.profileModel,
                this.rendezVousModel,
                this.positionModel,

                l,
            ),
        );
    }

    @Get('/professionnel/')
    @ApiOperation({ summary: 'Get all rendez-vous for a professional profile' })
    @ApiParam({ name: 'idProfessionnel', description: 'Professional profile ID' })
    @ApiOkResponse({ type: PaginationResponseDto<RendezVousResponseDto> })
    async findPrestataireRendezVous(
        @GetUser('id') userId: string,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RendezVousResponseDto>> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid profile ID format');
        }

        const { data, total } = await this.rendezVousService.findPrestataireRendezVous(
            userId,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RendezVousResponseDto.fromRendezVous(
                this.userModel,
                this.agendaModel,
                this.realisationModel,
                this.realisationFileModel,
                this.creneauModel,
                this.profileModel,
                this.rendezVousModel,
                this.positionModel,

                l,
            ),
        );
    }

    @Patch('/:id/accept')
    @ApiOperation({ summary: 'Accept a rendez-vous' })
    @ApiParam({ name: 'id', description: 'Rendez-vous ID' })
    @ApiOkResponse({ type: RendezVousResponseDto })
    async acceptRdv(
        @Param('id') id: string,
        // @GetUser('id') userId: string,
    ): Promise<RendezVousResponseDto> {
        const rendezVous = await this.rendezVousService.acceptRdv(id);
        return RendezVousResponseDto.fromRendezVous(
            this.userModel,
            this.agendaModel,
            this.realisationModel,
            this.realisationFileModel,
            this.creneauModel,
            this.profileModel,
            this.rendezVousModel,
            this.positionModel,

            rendezVous,
        );
    }

    @Patch('/:id/decline')
    @ApiOperation({ summary: 'Decline a rendez-vous' })
    @ApiParam({ name: 'id', description: 'Rendez-vous ID' })
    @ApiOkResponse({ type: RendezVousResponseDto })
    async declineRdv(
        @Param('id') id: string,
        // @GetUser('id') userId: string,
    ): Promise<RendezVousResponseDto> {
        const rendezVous = await this.rendezVousService.declineRdv(id);
        return RendezVousResponseDto.fromRendezVous(
            this.userModel,
            this.agendaModel,
            this.realisationModel,
            this.realisationFileModel,
            this.creneauModel,
            this.profileModel,
            this.rendezVousModel,
            this.positionModel,

            rendezVous,
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a rendez-vous' })
    @ApiParam({ name: 'id', description: 'Rendez-vous ID' })
    @ApiOkResponse({ description: 'Rendez-vous successfully deleted' })
    async delete(
        @Param('id') id: string,
        // @GetUser('id') userId: string
    ): Promise<void> {
        await this.rendezVousService.deleteRdv(id);
    }
}
