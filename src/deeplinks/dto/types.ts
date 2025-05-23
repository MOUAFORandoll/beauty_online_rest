export interface IShareData {
    pageTitle?: string | null;
    title?: string | null;
    description?: string | null;
    image?: string | null;
    imageHeight: '1200' | string | null;
    imageWidth: '630' | string | null;
    url?: string | null;
    sitename?: string | null;
    appleAppId?: string | null;
    googleAppId?: string | null;
    appName?: string | null;
    site?: string | null;
}

export type ShareData = Partial<IShareData>;