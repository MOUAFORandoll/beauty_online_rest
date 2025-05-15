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
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RealisationResponseDto } from '../dto';
import { RealisationService } from '../providers';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto, Public } from 'src/common/apiutils';
import {
    CreateRealisationDto,
    FindRealisationDto,
    UpdateRealisationDto,
} from '../dto/realisation.request.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { REALISATION_FILE_MODEL_NAME, RealisationFileModel } from 'src/databases/services/entities';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';

@ApiTags('Realisations')
@Controller('realisations')
export class RealisationController {
    constructor(
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,
        private readonly realisationService: RealisationService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'create realisation profile',
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images[]'))
    @ApiOkResponse({ type: RealisationResponseDto })
    async create(
        @GetUser('id') id: string,
        @Body() dto: CreateRealisationDto,
        @UploadedFiles() images: Array<Express.Multer.File>,
    ): Promise<RealisationResponseDto> {
        dto.images = images;
        console.log(dto.images);
        await this.dbUsersService.getUser(id);
        const profile = await this.realisationService.create(dto, id);
        return RealisationResponseDto.fromRealisation(profile, this.realisationFileModel);
    }
    @Get('/me')
    @ApiOperation({
        summary: 'Find user profile',
    })
    async findUserRealisation(
        @GetUser('id') idUser: string,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RealisationResponseDto>> {
        const { data, total } = await this.realisationService.findUserRealisation(
            idUser,
            pagination,
        );
        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RealisationResponseDto.fromRealisation(l, this.realisationFileModel),
        );
    }
    @Get('/professional/:idProfessionnel')
    @ApiOperation({
        summary: 'Find user profile',
    })
    async findProRealisation(
        @Param('idProfessionnel') idProfessionnel: string,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RealisationResponseDto>> {
        const { data, total } = await this.realisationService.findUserRealisation(
            idProfessionnel,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RealisationResponseDto.fromRealisation(l, this.realisationFileModel),
        );
    }

    @Get('/filter')
    @ApiOperation({
        summary: 'filter profile ',
    })
    @Public()
    async findRealisationFilter(
        @Query() filter: FindRealisationDto,
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RealisationResponseDto>> {
        const { data, total } = await this.realisationService.findRealisationFilter(
            filter,
            pagination,
        );

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RealisationResponseDto.fromRealisation(l, this.realisationFileModel),
        );
    }

    @Get('')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @Public()
    async findAll(
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RealisationResponseDto>> {
        const { data, total } = await this.realisationService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RealisationResponseDto.fromRealisation(l, this.realisationFileModel),
        );
    }

    @Put(':id')
    @ApiOperation({
        summary: 'update user profile',
    })
    async update(
        @Param('id') id: string,
        @GetUser('id') idUser: string,
        @Body() dto: UpdateRealisationDto,
    ): Promise<RealisationResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const profile = await this.realisationService.update(id, dto);
        return RealisationResponseDto.fromRealisation(profile, this.realisationFileModel);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.realisationService.delete(id);
    }
}
