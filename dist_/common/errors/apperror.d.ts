import { IDisplayText } from '../types';
export declare class IAppError {
    code: string;
    message: string;
    display_messages?: Array<IDisplayText>;
    details?: any;
    status_code?: number | null;
    url?: string | null;
}
export declare class IAppErrorDto {
    error: IAppError;
}
export interface IAppErrorDictionary {
    [key: string]: IAppError;
}
export declare function isAppErrorObject(o: object): boolean;
