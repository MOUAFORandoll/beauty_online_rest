"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileProErrors = exports.PROFILE_PRO_OPERATION_UNAUTHORIZED = exports.PROFILE_PRO_NOT_FOUND = void 0;
exports.PROFILE_PRO_NOT_FOUND = 'PROFILE_PRO_NOT_FOUND';
exports.PROFILE_PRO_OPERATION_UNAUTHORIZED = 'PROFILE_PRO_OPERATION_UNAUTHORIZED';
exports.ProfileProErrors = {
    PROFILE_PRO_NOT_FOUND: {
        message: 'Professional Profilee Not Found',
        code: exports.PROFILE_PRO_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'Professional profilee does not exist. Please contact an administrator.',
            },
            {
                lang: 'fr',
                value: 'Profile professionnel inexistant. Veuillez contacter un administrateur.',
            },
        ],
    },
    PROFILE_PRO_OPERATION_UNAUTHORIZED: {
        code: exports.PROFILE_PRO_OPERATION_UNAUTHORIZED,
        message: 'Professional profilee operation unauthorized',
        display_messages: [
            {
                lang: 'en',
                value: 'You are not authorized to perform this operation.',
            },
            {
                lang: 'fr',
                value: "Vous n'êtes pas autorisé à effectuer cette opération.",
            },
        ],
    },
};
//# sourceMappingURL=profile.errors.js.map