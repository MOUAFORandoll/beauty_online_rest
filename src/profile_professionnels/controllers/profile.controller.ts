// profile.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto, ProfileResponseDto, FindByServiceDto } from '../dto';
import { ProfileService } from '../providers';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto, Public } from 'src/common/apiutils';

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
