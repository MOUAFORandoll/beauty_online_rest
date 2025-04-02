// profil.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfilDto, UpdateProfilDto, ProfilResponseDto } from '../dto';
import { ProfilService } from '../providers/profil.service';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';

@ApiTags('ProfilProfessionnels')
@Controller('profil-professionnels')
export class ProfilController {
    constructor(
        private readonly profilService: ProfilService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Update user phone',
    })
    @ApiOkResponse({ type: ProfilResponseDto })
    async create(
        @GetUser('id') id: string,

        @Body() dto: CreateProfilDto,
    ): Promise<ProfilResponseDto> {
        const user = await this.dbUsersService.getUser(id);
        let profil = await this.profilService.create(dto, id);
        return ProfilResponseDto.fromProfil(profil, user);
    }

    @Get(':id')
    async findById(
        @Param('id') id: string,

        @GetUser('id') idUser: string,
    ): Promise<ProfilResponseDto> {
        let profil = await this.profilService.findById(id);
        const user = await this.dbUsersService.getUser(idUser);
        return ProfilResponseDto.fromProfil(profil, user);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @GetUser('id') idUser: string,
        @Body() dto: UpdateProfilDto,
    ): Promise<ProfilResponseDto> {
        let profil = await this.profilService.update(id, dto);
        const user = await this.dbUsersService.getUser(idUser);
        return ProfilResponseDto.fromProfil(profil, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.profilService.delete(id);
    }
}
