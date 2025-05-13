// realisation.errors.ts

import { IAppErrorDictionary } from '../../common/errors';

export const ACTU_NOT_FOUND = 'ACTU_NOT_FOUND';
export const ActuErrors: IAppErrorDictionary = {
    ACTU_NOT_FOUND: {
        message: 'Actu Not Found',
        code: ACTU_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'Actu does not exist.',
            },
            {
                lang: 'fr',
                value: "La réalisation n'existe pas.",
            },
        ],
    },
};
