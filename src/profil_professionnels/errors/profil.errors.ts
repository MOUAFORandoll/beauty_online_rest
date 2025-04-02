import { IAppErrorDictionary } from '../../common/errors';

export const PROFIL_PRO_NOT_FOUND = 'PROFIL_PRO_NOT_FOUND';
export const PROFIL_PRO_OPERATION_UNAUTHORIZED = 'PROFIL_PRO_OPERATION_UNAUTHORIZED';
 
export const ProfilProErrors: IAppErrorDictionary = {
    PROFIL_PRO_NOT_FOUND: {
        message: 'Professional Profile Not Found',
        code: PROFIL_PRO_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'Professional profile does not exist. Please contact an administrator.',
            },
            {
                lang: 'fr',
                value: 'Profil professionnel inexistant. Veuillez contacter un administrateur.',
            },
        ],
    },

    PROFIL_PRO_OPERATION_UNAUTHORIZED: {
        code: PROFIL_PRO_OPERATION_UNAUTHORIZED,
        message: 'Professional profile operation unauthorized',
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
