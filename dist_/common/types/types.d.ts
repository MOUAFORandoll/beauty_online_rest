export declare class IDisplayText {
    lang: string;
    value: string;
}
export declare class IDictionary {
    name: string;
    displays: IDisplayText[];
}
export interface OIDictionary {
    [type: string]: IDisplayText[];
}
