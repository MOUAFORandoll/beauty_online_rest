// profile.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    HttpCode,
    HttpStatus,
    Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto, ProfileResponseDto, FindByServiceDto } from '../dto';
import { ProfileService } from '../providers';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto, Public } from 'src/common/apiutils';
import { UpdateUserPositionDto } from 'src/users/dto';
import { InjectModel } from '@nestjs/mongoose';
import { POSITION_MODEL_NAME, PositionModel } from 'src/databases/users/entities';
import {
    AGENDA_MODEL_NAME,
    AgendaModel,
    DATABASE_CONNECTION,
    REALISATION_MODEL_NAME,
    RealisationModel,
    RENDEZ_VOUS_MODEL_NAME,
    RendezVousModel,
} from 'src/databases/main.database.connection';

@ApiTags('ProfileProfessionnels')
@Controller('profile-professionnels')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,

        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,

        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,

        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'create user profile',
    })
    @ApiOkResponse({ type: ProfileResponseDto })
    async create(
        @GetUser('id') id: string,

        @Body() dto: CreateProfileDto,
    ): Promise<ProfileResponseDto> {
        await this.dbUsersService.getUser(id);
        const profile = await this.profileService.create(dto, id);
        return ProfileResponseDto.fromProfile(
            profile,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
        );
    }
    @Get('/me')
    @ApiOperation({
        summary: 'Find user profile',
    })
    @ApiOkResponse({ type: ProfileResponseDto })
    async findUserProfile(@GetUser('id') idUser: string): Promise<ProfileResponseDto> {
        const profile = await this.profileService.findUserProfile(idUser);

        return ProfileResponseDto.fromProfile(
            profile,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
        );
    }

    @Get('/filter')
    @ApiOperation({
        summary: 'filter profile ',
    })
    @Public()
    @ApiOkResponse({ type: PaginationResponseDto<ProfileResponseDto> })
    async findProfileByService(
        @Query() filterService: FindByServiceDto,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findProfileByFilter(
            filterService,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) =>
            ProfileResponseDto.fromProfile(
                profile,
                this.agendaModel,
                this.positionModel,
                this.realisationModel,
                this.rendezVousModel,
            ),
        );
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Find profile by id',
    })
    @ApiOkResponse({ type: ProfileResponseDto })
    async findOneById(@Param('id') id: string): Promise<ProfileResponseDto> {
        const profile = await this.profileService.findOneById(id);
        return ProfileResponseDto.fromProfile(
            profile,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
        );
    }
    @Get('')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @Public()
    @ApiOkResponse({ type: PaginationResponseDto<ProfileResponseDto> })
    async findAll(
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) =>
            ProfileResponseDto.fromProfile(
                profile,
                this.agendaModel,
                this.positionModel,
                this.realisationModel,
                this.rendezVousModel,
            ),
        );
    }

    @Get('proximity')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @Public()
    @ApiOkResponse({ type: PaginationResponseDto<ProfileResponseDto> })
    async findByProximity(
        @Param('longitude') longitude: number,
        @Param('latitude') latitude: number,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findByProximity(
            longitude,

            latitude,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((profile) =>
            ProfileResponseDto.fromProfile(
                profile,
                this.agendaModel,
                this.positionModel,
                this.realisationModel,
                this.rendezVousModel,
            ),
        );
    }

    /**
     * update user profile
     */
    @Put(':id')
    @ApiOperation({
        summary: 'update user profile',
    })
    @ApiOkResponse({ type: ProfileResponseDto })
    async update(
        @Param('id') id: string,
        @GetUser('id') idUser: string,
        @Body() dto: UpdateProfileDto,
    ): Promise<ProfileResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const profile = await this.profileService.update(id, dto);
        return ProfileResponseDto.fromProfile(
            profile,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
        );
    }

    /**
     * update user position
     */
    @Patch('/:id/update-position')
    @ApiOperation({
        summary: 'Update user position',
    })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async updateUserPosition(
        @Param('id') id: string,
        @Body() payload: UpdateUserPositionDto,
    ): Promise<void> {
        await this.profileService.updateProfilePosition(id, payload);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.profileService.delete(id);
    }
}
