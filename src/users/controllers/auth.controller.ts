import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserAuthenticationDto, UserAuthenticationResponseDto, UserDto } from '../dto';
import { IAppErrorDto } from 'src/common/errors';
import { AuthService } from '../providers';
import { Public } from 'src/common/apiutils';

@ApiTags('Auth')
@ApiResponse({
    status: '4XX',
    type: IAppErrorDto,
})
@ApiResponse({
    status: '5XX',
    type: IAppErrorDto,
})
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @ApiOperation({
        summary: 'Authenticate a user',
    })
    @ApiOkResponse({ type: UserAuthenticationResponseDto })
    @HttpCode(HttpStatus.OK)
    @Public()
    async authenticateUser(
        @Body() payload: UserAuthenticationDto,
    ): Promise<UserAuthenticationResponseDto> {
        const user = await this.authService.authentication(payload);
        return { user: UserDto.fromUser(user) };
    }
}
