import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../../../databases/main.database.connection';
import { ConfigService } from '@nestjs/config';
export declare class AuthClientGuard implements CanActivate {
    private readonly user;
    private readonly reflector;
    private readonly configService;
    constructor(user: UserModel, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    productionCanActivate(context: ExecutionContext): Promise<boolean>;
    developmentCanActivate(context: ExecutionContext): Promise<boolean>;
}
