export interface ShareableProperties {
    share(elementId: string): string;
}

export interface ShareableOptions {
    sharePath: string;
}
export function Shareable(options: ShareableOptions): ClassDecorator {
    return function (target: Function) {
        target.prototype.share = function (id: string): string {
            if (!this.configService) {
                throw new Error('dependency not found.');
            }
            const baseUrl = this.configService.get('DEEPLINKS_BASE_URL');
            return `${baseUrl}/${options.sharePath}/${id}`;
        };
    };
}
