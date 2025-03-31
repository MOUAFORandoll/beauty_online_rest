import { IAppErrorDictionary } from '../../common/errors';

export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const USER_OPERATION_UNAUTHORIZED = 'USER_OPERATION_UNAUTHORIZED';
export const USER_EMAIL_ALREADY_EXISTS = 'USER_EMAIL_ALREADY_EXISTS';
export const FIREBASE_AUTH_FAILED = 'FIREBASE_AUTH_FAILED';

export const UserErrors: IAppErrorDictionary = {
    USER_NOT_FOUND: {
        message: 'User Not Found',
        code: USER_NOT_FOUND,
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
        code: USER_OPERATION_UNAUTHORIZED,
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
        code: USER_EMAIL_ALREADY_EXISTS,
        message: 'Email used already exist for another account.',
        display_messages: [
            {
                lang: 'en',
                value: 'The email you used is already used by another account. Please sign up with a different provider.',
            },
            {
                lang: 'fr',
                value: 'L\'adresse mail fournie est déjà utilisée par un autre compte.',
            },
        ],
    },

    FIREBASE_AUTH_FAILED: {
        message: 'Firebase authentication failed',
        code: FIREBASE_AUTH_FAILED,
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
