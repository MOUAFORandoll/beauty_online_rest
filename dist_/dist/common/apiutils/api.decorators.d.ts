import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const checkIsPublic: (reflector: Reflector, context: ExecutionContext) => boolean;
