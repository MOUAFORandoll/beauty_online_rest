import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { UsersService } from '../providers';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto, UserAuthenticationResponseDto, UserDto } from '../dto';
import { GetUser } from '../decorators';
import * as Database from '../../databases/users/providers';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly dbUsersService: Database.UsersService,
    ) {}

    /**
     *  Récupère un utilisateur par son ID
     */
    @Get('/me')
    @ApiOperation({
        summary: 'Retrieves a user by their  token',
    })
    @ApiOkResponse({ type: UserDto })
    @HttpCode(HttpStatus.OK)
    async findOneUser(@GetUser('id') id: string): Promise<UserDto | null> {
        const user = await this.dbUsersService.getUser(id);

        return UserDto.fromUser(user);
    }

    /**
     * update user information
     */
    @Patch('')
    @ApiOperation({
        summary: 'Update user information',
    })
    @ApiOkResponse({ type: UserAuthenticationResponseDto })
    @HttpCode(HttpStatus.OK)
    async updateUserData(
        @GetUser('id') id: string,
        @Body() payload: UpdateUserDto,
    ): Promise<UserDto> {
        const { fullName } = payload;
        const user = await this.usersService.updateUserData(id, fullName);

        return UserDto.fromUser(user);
    }
}
