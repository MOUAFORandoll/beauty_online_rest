// realisation.errors.ts

import { IAppErrorDictionary } from '../../common/errors';

export const REALISATION_NOT_FOUND = 'REALISATION_NOT_FOUND';
export const REALISATION_UPDATE_FAILED = 'REALISATION_UPDATE_FAILED';
export const REALISATION_DELETE_FAILED = 'REALISATION_DELETE_FAILED';
export const REALISATION_CREATION_FAILED = 'REALISATION_CREATION_FAILED';

export const RealisationErrors: IAppErrorDictionary = {
    REALISATION_NOT_FOUND: {
        message: 'Realisation Not Found',
        code: REALISATION_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'Realisation does not exist.',
            },
            {
                lang: 'fr',
                value: "La réalisation n'existe pas.",
            },
        ],
    },
    REALISATION_UPDATE_FAILED: {
        message: 'Realisation Update Failed',
        code: REALISATION_UPDATE_FAILED,
        display_messages: [
            {
                lang: 'en',
                value: 'Failed to update the realisation.',
            },
            {
                lang: 'fr',
                value: 'La mise à jour de la réalisation a échoué.',
            },
        ],
    },
    REALISATION_DELETE_FAILED: {
        message: 'Realisation Delete Failed',
        code: REALISATION_DELETE_FAILED,
        display_messages: [
            {
                lang: 'en',
                value: 'Failed to delete the realisation.',
            },
            {
                lang: 'fr',
                value: 'La suppression de la réalisation a échoué.',
            },
        ],
    },
    REALISATION_CREATION_FAILED: {
        message: 'Realisation Creation Failed',
        code: REALISATION_CREATION_FAILED,
        display_messages: [
            {
                lang: 'en',
                value: 'Failed to create the realisation.',
            },
            {
                lang: 'fr',
                value: 'La création de la réalisation a échoué.',
            },
        ],
    },
};
