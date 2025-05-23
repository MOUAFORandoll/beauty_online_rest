// realisation.errors.ts

import { IAppErrorDictionary } from '../../../common/errors';

export const RENDEZ_VOUS_NOT_FOUND = 'RENDEZ_VOUS_NOT_FOUND';
export const RENDEZ_VOUS_UPDATE_FAILED = 'RENDEZ_VOUS_UPDATE_FAILED';
export const RENDEZ_VOUS_DELETE_FAILED = 'RENDEZ_VOUS_DELETE_FAILED';
export const RENDEZ_VOUS_CREATION_FAILED = 'RENDEZ_VOUS_CREATION_FAILED';

export const RendezVousErrors: IAppErrorDictionary = {
    RENDEZ_VOUS_NOT_FOUND: {
        message: 'RendezVous Not Found',
        code: RENDEZ_VOUS_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'RendezVous does not exist.',
            },
            {
                lang: 'fr',
                value: "La réalisation n'existe pas.",
            },
        ],
    },
    RENDEZ_VOUS_UPDATE_FAILED: {
        message: 'RendezVous Update Failed',
        code: RENDEZ_VOUS_UPDATE_FAILED,
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
    RENDEZ_VOUS_DELETE_FAILED: {
        message: 'RendezVous Delete Failed',
        code: RENDEZ_VOUS_DELETE_FAILED,
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
    RENDEZ_VOUS_CREATION_FAILED: {
        message: 'RendezVous Creation Failed',
        code: RENDEZ_VOUS_CREATION_FAILED,
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
