import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../providers';
import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
    UpdateUserDto,
    UpdateUserPositionDto,
    UserAuthenticationResponseDto,
    UserDto,
} from '../dto';
import { GetUser } from '../decorators';
import * as Database from '../../../databases/users/providers';
import { FileInterceptor } from '@nestjs/platform-express';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import { Public } from 'src/common/apiutils/api.decorators';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly dbUsersService: Database.UsersService,
        private readonly sendNotificationsService: SendNotificationsService,
    ) {}

    /**
     *
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
     *  Récupère un utilisateur par son ID
     */
    @Get('/all')
    @ApiOperation({
        summary: 'Retrieves all ',
    })
    @Public()
    @ApiOkResponse({ type: UserDto })
    @HttpCode(HttpStatus.OK)
    async findAllUser(): Promise<UserDto[]> {
        const users = await this.dbUsersService.getAllUsers();

        return users.map((user) => UserDto.fromUser(user));
    }

    /**
     *  Récupère un utilisateur par son ID
     */
    @Get('/send-notif')
    @ApiOperation({
        summary: 'Retrieves a user by their  token',
    })
    @Public()
    @HttpCode(HttpStatus.OK)
    async sendNotif() {
        const user = await this.dbUsersService.getUser('68156b0b5ad449e5c595ebb6');

        await this.sendNotificationsService.welComeNotification(user);
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
        const user = await this.usersService.updateUserData(id, payload);

        return UserDto.fromUser(user);
    }
    @Patch('/picture')
    @ApiOperation({
        summary: 'create user profile',
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOkResponse({ type: UserDto })
    async updateUserPicture(
        @GetUser('id') id: string,

        @UploadedFile() image?: Express.Multer.File,
    ): Promise<UserDto> {
        await this.dbUsersService.getUser(id);
        const user = await this.usersService.updateUserPhoto(image, id);

        return UserDto.fromUser(user);
    }
    /**
     * update user information
     */
    @Patch('/update-position')
    @ApiOperation({
        summary: 'Update user position',
    })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async updateUserPosition(
        @GetUser('id') id: string,
        @Body() payload: UpdateUserPositionDto,
    ): Promise<void> {
        await this.usersService.updateUserPosition(id, payload);
    } /**
     *  set Firebase notification token of the user
     */
    @Patch('/notification')
    @ApiOperation({
        summary: 'Firebase notification token of the user',
    })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async notificationToken(
        @GetUser('id') id: string,
        @Body() payload: { notification_token: string },
    ): Promise<void> {
        await this.usersService.notificationToken(id, payload.notification_token);
    }
}
