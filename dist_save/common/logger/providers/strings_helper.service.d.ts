export declare class StringsHelperService {
    constructor();
    private escapeRegExp;
    replaceAll(str: string, match: string, replacement: string | undefined | null): string;
    trimToEmpty(_str: string | undefined | null): string;
    isStrEmpty(_str: string | undefined | null): boolean;
    normalizeNFD(str: string): string;
}
