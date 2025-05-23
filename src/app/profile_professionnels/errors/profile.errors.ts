import { IAppErrorDictionary } from '../../../common/errors';

export const PROFILE_PRO_NOT_FOUND = 'PROFILE_PRO_NOT_FOUND';
export const PROFILE_PRO_OPERATION_UNAUTHORIZED = 'PROFILE_PRO_OPERATION_UNAUTHORIZED';

export const ProfileProErrors: IAppErrorDictionary = {
    PROFILE_PRO_NOT_FOUND: {
        message: 'Professional Profilee Not Found',
        code: PROFILE_PRO_NOT_FOUND,
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
        code: PROFILE_PRO_OPERATION_UNAUTHORIZED,
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
