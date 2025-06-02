import { Request, Response } from 'express';
import { ActuService } from 'src/app/actu/providers';
export declare class StreamController {
    private readonly actuService;
    constructor(actuService: ActuService);
    stream(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private handleRangeRequest;
    private handleFullFileStream;
}
