"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANDROID_SHA256_REGEXP = exports.ANDROID_PACKAGE_NAME_REGEXP = exports.SUBDOMAIN_REGEXP = exports.URL_REGEXP = void 0;
exports.URL_REGEXP = new RegExp('\\b(?:https?://)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?:/\\S*)?\\b');
exports.SUBDOMAIN_REGEXP = new RegExp('^[a-zA-Z0-9-_]+$');
exports.ANDROID_PACKAGE_NAME_REGEXP = new RegExp('^([a-zA-Z][a-zA-Z0-9_]*)(\\.[a-zA-Z][a-zA-Z0-9_]*)+$');
exports.ANDROID_SHA256_REGEXP = new RegExp('^([a-fA-F0-9]{2}:){31}[a-fA-F0-9]{2}$');
//# sourceMappingURL=base.constants.js.map