"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrors = exports.FIREBASE_AUTH_FAILED = exports.USER_EMAIL_ALREADY_EXISTS = exports.USER_OPERATION_UNAUTHORIZED = exports.USER_NOT_FOUND = void 0;
exports.USER_NOT_FOUND = 'USER_NOT_FOUND';
exports.USER_OPERATION_UNAUTHORIZED = 'USER_OPERATION_UNAUTHORIZED';
exports.USER_EMAIL_ALREADY_EXISTS = 'USER_EMAIL_ALREADY_EXISTS';
exports.FIREBASE_AUTH_FAILED = 'FIREBASE_AUTH_FAILED';
exports.UserErrors = {
    USER_NOT_FOUND: {
        message: 'User Not Found',
        code: exports.USER_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'User account does not exist. Please contact an administrator.',
            },
            {
                lang: 'fr',
                value: 'Compte utilisateur inexistant. Veuillez contacter un administrateur.',
            },
        ],
    },
    USER_OPERATION_UNAUTHORIZED: {
        code: exports.USER_OPERATION_UNAUTHORIZED,
        message: 'User operation unauthorized',
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
    USER_AUTH_INVALID_PARAMS: {
        code: exports.USER_EMAIL_ALREADY_EXISTS,
        message: 'Email used already exist for another account.',
        display_messages: [
            {
                lang: 'en',
                value: 'The email you used is already used by another account. Please sign up with a different provider.',
            },
            {
                lang: 'fr',
                value: "L'adresse mail fournie est déjà utilisée par un autre compte.",
            },
        ],
    },
    FIREBASE_AUTH_FAILED: {
        message: 'Firebase authentication failed',
        code: exports.FIREBASE_AUTH_FAILED,
        display_messages: [
            {
                lang: 'en',
                value: 'Firebase authentication failed.',
            },
            {
                lang: 'fr',
                value: "L'authentification firebase a échouée.",
            },
        ],
    },
};
//# sourceMappingURL=users.errors.js.map