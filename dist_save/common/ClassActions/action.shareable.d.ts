export interface ShareableProperties {
    share(elementId: string): string;
}
export interface ShareReableOptions {
    sharePath: string;
}
export declare function Shareable(options: ShareReableOptions): ClassDecorator;
