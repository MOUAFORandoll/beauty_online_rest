export interface ShareableProperties {
    share(elementId: string): string;
}
export interface ShareableOptions {
    sharePath: string;
}
export declare function Shareable(options: ShareableOptions): ClassDecorator;
