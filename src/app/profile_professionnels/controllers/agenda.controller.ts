// agenda.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgendaResponseDto } from '../dto';
import { AgendaService } from '../providers';
import { GetUser } from 'src/app/users/decorators';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { AddCreneauxAgendaDto, CreateAgendaDto, UpdateAgendaDto } from '../dto/agenda.request.dto';
import {
    CRENEAU_MODEL_NAME,
    CreneauModel,
    DATABASE_CONNECTION,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
    constructor(
        @InjectModel(CRENEAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly creneauModel: CreneauModel,

        private readonly agendaService: AgendaService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'create agenda',
    })
    @ApiOkResponse({ type: AgendaResponseDto })
    async create(
        @GetUser('id') id: string,

        @Body() dto: CreateAgendaDto,
    ): Promise<AgendaResponseDto> {
        await this.dbUsersService.getUser(id);
        const agenda = await this.agendaService.create(dto, id);
        return await AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }
    @Get('/me')
    @ApiOperation({
        summary: 'Find my agenda',
    })
    async findMeProfessionalAgenda(
        @GetUser('id') idUser: string,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<AgendaResponseDto>> {
        const { data, total } = await this.agendaService.findMeProfessionalAgenda(
            idUser,
            pagination,
        );
        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            AgendaResponseDto.fromAgenda(l, this.creneauModel),
        );
    }

    @Get('/professional/:idProfessionnel')
    @ApiOperation({
        summary: 'Find professional agenda',
    })
    async findProfessionalAgenda(
        @Param('idProfessionnel') idProfessionnel: string,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<AgendaResponseDto>> {
        const { data, total } = await this.agendaService.findProfessionalAgenda(
            idProfessionnel,
            pagination,
        );
        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            AgendaResponseDto.fromAgenda(l, this.creneauModel),
        );
    }
    @Post('/:idAgenda/creneau')
    @ApiOperation({
        summary: 'add creneau user agenda',
    })
    async addCreneauxToAgenda(
        @Param('idAgenda') idAgenda: string,
        @GetUser('id') idUser: string,
        @Body() dto: AddCreneauxAgendaDto,
    ): Promise<AgendaResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const agenda = await this.agendaService.addCreneauxToAgenda(idAgenda, dto);
        return await AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }

    @Delete('/creneau/:idCreneau')
    async deleteCreneau(
        @Param('idCreneau') idCreneau: string,
        @GetUser('id') idUser: string,
    ): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.deleteCreneau(idCreneau);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'update user agenda',
    })
    async update(
        @Param('id') id: string,
        @GetUser('id') idUser: string,
        @Body() dto: UpdateAgendaDto,
    ): Promise<AgendaResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const agenda = await this.agendaService.update(id, dto);
        return await AgendaResponseDto.fromAgenda(agenda, this.creneauModel);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.delete(id);
    }
}
