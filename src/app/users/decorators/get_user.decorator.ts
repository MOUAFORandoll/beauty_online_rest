import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (data) return request.user[data];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.user;
});
