// agenda.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgendaResponseDto } from '../dto';
import { AgendaService } from '../providers';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { AddCrenauxAgendaDto, CreateAgendaDto, UpdateAgendaDto } from '../dto/agenda.request.dto';
import {
    CRENAU_MODEL_NAME,
    CrenauModel,
    DATABASE_CONNECTION,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
    constructor(
        @InjectModel(CRENAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly crenauModel: CrenauModel,

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
        return await AgendaResponseDto.fromAgenda(agenda, this.crenauModel);
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
            AgendaResponseDto.fromAgenda(l, this.crenauModel),
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
            AgendaResponseDto.fromAgenda(l, this.crenauModel),
        );
    }
    @Post('/:idAgenda/crenau')
    @ApiOperation({
        summary: 'add creneau user agenda',
    })
    async addCrenauxToAgenda(
        @Param('idAgenda') idAgenda: string,
        @GetUser('id') idUser: string,
        @Body() dto: AddCrenauxAgendaDto,
    ): Promise<AgendaResponseDto> {
        await this.dbUsersService.getUser(idUser);
        const agenda = await this.agendaService.addCrenauxToAgenda(idAgenda, dto);
        return await AgendaResponseDto.fromAgenda(agenda, this.crenauModel);
    }

    @Delete('/crenau/:idCrenau')
    async deleteCrenau(
        @Param('idCrenau') idCrenau: string,
        @GetUser('id') idUser: string,
    ): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.deleteCrenau(idCrenau);
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
        return await AgendaResponseDto.fromAgenda(agenda, this.crenauModel);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.delete(id);
    }
}
