import mongoose, { ObjectId, Schema } from 'mongoose';
import { mapObjIndexed } from 'ramda';

const preSave = function () {
    this.updated_at = Date.now();
};

const removeDeletedAt = function (next) {
    this.where('deleted_at').equals(null);
    next();
};

const sortByCreatedAt = function (next) {
    this.sort({ created_at: -1 });
    next();
};

/**
 * Convertit les chaines de caractères éligibles en ObjectID dans les aggrégations.
 * La conversion n'est pas faite automatiquement
 * */
const castObjectIDs = function (next) {
    const isObjectId = (v) => {
        const regex = new RegExp(/^[a-f\d]{24}$/i);
        return (
            (typeof v === 'string' || typeof v === 'object') &&
            mongoose.Types.ObjectId.isValid(v) &&
            regex.test(v.toString())
        );
    };
    const toObjectId = (v) => new mongoose.Types.ObjectId(v);
    const isPrimitiveType = (v) =>
        typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'undefined' ||
        v === null ||
        v instanceof RegExp ||
        typeof v === 'string' ||
        v instanceof Date;

    const parseValue = (v) =>
        isObjectId(v) ? toObjectId(v) : isPrimitiveType(v) ? v : parseQuery(v);

    const parseQuery = (q) =>
        Array.isArray(q) ? q.map(parseValue) : mapObjIndexed(parseValue, q);

    const pipeline = this.pipeline();
    for (let i = 0; i < pipeline.length; i++) {
        const stage = pipeline[i];
        if (stage.$match != null) {
            // is a match stage
            stage.$match = parseQuery(stage.$match);
        }
    }
    next();
};

const removeDeletedAtInStages = function (next) {
    this.pipeline().unshift({ $match: { deleted_at: null } });
    next();
};

const sortByCreatedAtInStages = function (next) {
    this.pipeline().unshift({ $sort: { created_at: -1 } });
    next();
};

/**
 * Ajoute les fonctions prédéfinies au schema passé en entrée
 * Par exemple les fonctions pre, ou encore les methodes d'instance, statics ...
 * */
export const applySortedMongooseAdditionalFunctions = (schema: Schema): Schema => {
    return applySortPreMiddlewares(applyPreMiddlewares(applyMethods(schema)));
};

/**
 * Ajoute les fonctions prédéfinies au schema passé en entrée, en plus des fonctions de tri
 * Par exemple les fonctions pre, ou encore les methodes d'instance, statics ...
 * */
export const applyMongooseAdditionalFunctions = (schema: Schema): Schema => {
    return applyPreMiddlewares(applyMethods(schema));
};

/**
 * Ajoute les fonctions prédéfinies au schema passé en entrée
 * */
const applyPreMiddlewares = (schema: Schema): Schema => {
    return schema
        .pre('save', preSave)
        .pre('aggregate', removeDeletedAtInStages)
        .pre('aggregate', castObjectIDs)
        .pre('countDocuments', removeDeletedAt)
        .pre('updateMany', removeDeletedAt)
        .pre('updateOne', removeDeletedAt)
        .pre('find', removeDeletedAt)
        .pre('findOne', removeDeletedAt);
};

/**
 * Ajoute les fonctions de tri au schema passé en entrée
 * */
const applySortPreMiddlewares = (schema: Schema): Schema => {
    return schema
        .pre('aggregate', sortByCreatedAtInStages)
        .pre('find', sortByCreatedAt)
};

/**
 * Ajoute les méthodes définies au schema passé en entrée
 * */
const applyMethods = (schema: Schema): Schema => {
    schema.methods.setDeleted = function () {
        this.deleted_at = new Date();
        return this.save();
    };
    return schema;
};

export const idEquals = function(one: string | ObjectId, other: string | ObjectId) {
    return one.toString() === other.toString();
}
