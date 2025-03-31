export const URL_REGEXP = new RegExp('\\b(?:https?://)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?:/\\S*)?\\b');
export const SUBDOMAIN_REGEXP = new RegExp('^[a-zA-Z0-9-_]+$');
export const ANDROID_PACKAGE_NAME_REGEXP = new RegExp(
    '^([a-zA-Z][a-zA-Z0-9_]*)(\\.[a-zA-Z][a-zA-Z0-9_]*)+$'
);
export const ANDROID_SHA256_REGEXP = new RegExp('^([a-fA-F0-9]{2}:){31}[a-fA-F0-9]{2}$');
