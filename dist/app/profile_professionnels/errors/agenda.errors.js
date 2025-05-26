"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaErrors = exports.AGENDA_CREATION_FAILED = exports.AGENDA_DELETE_FAILED = exports.AGENDA_UPDATE_FAILED = exports.AGENDA_NOT_FOUND = void 0;
exports.AGENDA_NOT_FOUND = 'AGENDA_NOT_FOUND';
exports.AGENDA_UPDATE_FAILED = 'AGENDA_UPDATE_FAILED';
exports.AGENDA_DELETE_FAILED = 'AGENDA_DELETE_FAILED';
exports.AGENDA_CREATION_FAILED = 'AGENDA_CREATION_FAILED';
exports.AgendaErrors = {
    AGENDA_NOT_FOUND: {
        message: 'Agenda Not Found',
        code: exports.AGENDA_NOT_FOUND,
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
        code: exports.AGENDA_UPDATE_FAILED,
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
        code: exports.AGENDA_DELETE_FAILED,
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
        code: exports.AGENDA_CREATION_FAILED,
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
//# sourceMappingURL=agenda.errors.js.map