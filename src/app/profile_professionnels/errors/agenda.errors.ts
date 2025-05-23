// realisation.errors.ts

import { IAppErrorDictionary } from '../../../common/errors';

export const AGENDA_NOT_FOUND = 'AGENDA_NOT_FOUND';
export const AGENDA_UPDATE_FAILED = 'AGENDA_UPDATE_FAILED';
export const AGENDA_DELETE_FAILED = 'AGENDA_DELETE_FAILED';
export const AGENDA_CREATION_FAILED = 'AGENDA_CREATION_FAILED';

export const AgendaErrors: IAppErrorDictionary = {
    AGENDA_NOT_FOUND: {
        message: 'Agenda Not Found',
        code: AGENDA_NOT_FOUND,
        display_messages: [
            {
                lang: 'en',
                value: 'Agenda does not exist.',
            },
            {
                lang: 'fr',
                value: "La réalisation n'existe pas.",
            },
        ],
    },
    AGENDA_UPDATE_FAILED: {
        message: 'Agenda Update Failed',
        code: AGENDA_UPDATE_FAILED,
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
    AGENDA_DELETE_FAILED: {
        message: 'Agenda Delete Failed',
        code: AGENDA_DELETE_FAILED,
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
    AGENDA_CREATION_FAILED: {
        message: 'Agenda Creation Failed',
        code: AGENDA_CREATION_FAILED,
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
