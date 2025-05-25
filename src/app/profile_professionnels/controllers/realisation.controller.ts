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
import { GetUser } from 'src/app/users/decorators';
import * as Database from '../../../databases/users/providers';
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
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Realisations')
@Controller('realisations')
export class RealisationController {
    private readonly localDirectory = path.join(__dirname, '../../../../upload');
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
        await this.dbUsersService.getUser(id);
        const profile = await this.realisationService.create(dto, id);
        return RealisationResponseDto.fromRealisation(profile, this.realisationFileModel);
    }

    @Get('/fake-data')
    @ApiOperation({
        summary: 'Create fake realisations for a test profile',
    })
    @Public()
    async fakeData(): Promise<RealisationResponseDto[]> {
         const titles: string[] = [
            'Nattes collées',
            'Vanilles',
            'Tresses africaines',
            'Chignon',
            'Coupe dégradée',
            'Tissage',
            'Perruque lace',
            'Crochet braids',
            'Coiffure protectrice',
            'Locks',
            'Twists',
            'Braids',
            'Fulani braids',
        ];
       
        const allImageFiles = fs
            .readdirSync(this.localDirectory)
            .filter((file) => fs.statSync(path.join(this.localDirectory, file)).isFile());
      
        const userId = '68156b0b5ad449e5c595ebb6';
        const realisations: RealisationResponseDto[] = [];

        const getRandomFromArray = <T>(arr: T[], count: number): T[] =>
            [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

        const getRandomPrice = (): string => Math.floor(Math.random() * 30 + 20).toString(); // entre 20 et 50€

        for (let i = 0; i < 50; i++) {
            const selectedImages = getRandomFromArray(allImageFiles, 3);
      const imagesBuffer = selectedImages.map((fileName) => {
                const filePath = path.join(this.localDirectory, fileName);
                const buffer = fs.readFileSync(filePath);
                return {
                    fieldname: 'images',
                    originalname: fileName,
                    encoding: '7bit',
                    mimetype: 'image/jpeg', // ou image/png selon ton cas
                    buffer,
                    size: buffer.length,
                } as Express.Multer.File;
            });

            const dto = {
                title: titles[Math.floor(Math.random() * titles.length)],
                price: getRandomPrice(),
                images: imagesBuffer,
            };

            const realisation = await this.realisationService.create(dto, userId);

            const responseDto = await RealisationResponseDto.fromRealisation(
                realisation,
                this.realisationService['realisationFileModel'],
            );
            realisations.push(responseDto);
        }

        return realisations;
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
        const { data, total } = await this.realisationService.findProfessionalRealisation(
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
