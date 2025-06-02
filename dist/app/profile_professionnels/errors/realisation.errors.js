"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealisationErrors = exports.REALISATION_CREATION_FAILED = exports.REALISATION_DELETE_FAILED = exports.REALISATION_UPDATE_FAILED = exports.REALISATION_NOT_FOUND = void 0;
exports.REALISATION_NOT_FOUND = 'REALISATION_NOT_FOUND';
exports.REALISATION_UPDATE_FAILED = 'REALISATION_UPDATE_FAILED';
exports.REALISATION_DELETE_FAILED = 'REALISATION_DELETE_FAILED';
exports.REALISATION_CREATION_FAILED = 'REALISATION_CREATION_FAILED';
exports.RealisationErrors = {
    REALISATION_NOT_FOUND: {
        message: 'Realisation Not Found',
        code: exports.REALISATION_NOT_FOUND,
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
        code: exports.REALISATION_UPDATE_FAILED,
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
        code: exports.REALISATION_DELETE_FAILED,
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
        code: exports.REALISATION_CREATION_FAILED,
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
//# sourceMappingURL=realisation.errors.js.map