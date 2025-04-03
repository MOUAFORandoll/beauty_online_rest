// agenda.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgendaResponseDto } from '../dto';
import { AgendaService } from '../providers';
import { GetUser } from 'src/users/decorators';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { CreateAgendaDto, UpdateAgendaDto } from '../dto/agenda.request.dto';

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
    constructor(
        private readonly agendaService: AgendaService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Post()
    @ApiOperation({
        summary: 'create agenda ',
    })
    @ApiOkResponse({ type: AgendaResponseDto })
    async create(
        @GetUser('id') id: string,

        @Body() dto: CreateAgendaDto,
    ): Promise<AgendaResponseDto> {
        await this.dbUsersService.getUser(id);
        const agenda = await this.agendaService.create(dto, id);
        return AgendaResponseDto.fromAgenda(agenda);
    }
    @Get('/user')
    @ApiOperation({
        summary: 'Find user agenda',
    })
    async findUserAgenda(
        @GetUser('id') idUser: string,

        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<AgendaResponseDto>> {
        const { data, total } = await this.agendaService.findUserAgenda(idUser, pagination);
        return PaginationResponseDto.responseDto(pagination, data, total).map((l) =>
            AgendaResponseDto.fromAgenda(l),
        );
    }
    @Put(':id')
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
        return AgendaResponseDto.fromAgenda(agenda);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') idUser: string): Promise<void> {
        await this.dbUsersService.getUser(idUser);
        await this.agendaService.delete(id);
    }
}
