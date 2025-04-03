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

@ApiTags('ProfileProfessionnels')
@Controller('profile-professionnels')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,

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
        return ProfileResponseDto.fromProfile(profile);
    }
    @Get('/me')
    @ApiOperation({
        summary: 'Find user profile',
    })
    async findUserProfile(@GetUser('id') idUser: string): Promise<ProfileResponseDto> {
        const profile = await this.profileService.findUserProfile(idUser);

        return ProfileResponseDto.fromProfile(profile);
    }

    @Get('/filter')
    @ApiOperation({
        summary: 'filter profile ',
    })
    @Public()
    async findProfileByService(
        @Query() filterService: FindByServiceDto,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findProfileByFilter(
            filterService,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).map((l) =>
            ProfileResponseDto.fromProfile(l),
        );
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Find profile by id',
    })
    async findOneById(@Param('id') id: string): Promise<ProfileResponseDto> {
        const profile = await this.profileService.findOneById(id);
        return ProfileResponseDto.fromProfile(profile);
    }
    @Get('')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @Public()
    async findAll(
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).map((l) =>
            ProfileResponseDto.fromProfile(l),
        );
    }

    @Get('proximity')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @Public()
    async findByProximity(
        @Param('longitude') longitude: string,
        @Param('latitude') latitude: string,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<ProfileResponseDto>> {
        const { data, total } = await this.profileService.findByProximity(
            longitude,

            latitude,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).map((l) =>
            ProfileResponseDto.fromProfile(l),
        );
    }
    /**
     * update user information
     */
    @Patch('/:id/update-position')
    @ApiOperation({
        summary: 'Update user phone',
    })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async updateUserPosition(
        @Param('id') id: string,
        @Body() payload: UpdateUserPositionDto,
    ): Promise<void> {
        await this.profileService.updateProfilePosition(id, payload);
    }
    @Put(':id')
    @ApiOperation({
        summary: 'update user profile',
    })
    async update(
        @Param('id') id: string,
        @GetUser('id') idUser: string,
        @Body() dto: UpdateProfileDto,
    ): Promise<ProfileResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const profile = await this.profileService.update(id, dto);
        return ProfileResponseDto.fromProfile(profile);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.profileService.delete(id);
    }
}
