"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idEquals = exports.applyMongooseAdditionalFunctions = exports.applySortedMongooseAdditionalFunctions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ramda_1 = require("ramda");
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
const castObjectIDs = function (next) {
    const isObjectId = (v) => {
        const regex = new RegExp(/^[a-f\d]{24}$/i);
        return ((typeof v === 'string' || typeof v === 'object') &&
            mongoose_1.default.Types.ObjectId.isValid(v) &&
            regex.test(v.toString()));
    };
    const toObjectId = (v) => new mongoose_1.default.Types.ObjectId(v);
    const isPrimitiveType = (v) => typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'undefined' ||
        v === null ||
        v instanceof RegExp ||
        typeof v === 'string' ||
        v instanceof Date;
    const parseValue = (v) => isObjectId(v) ? toObjectId(v) : isPrimitiveType(v) ? v : parseQuery(v);
    const parseQuery = (q) => Array.isArray(q) ? q.map(parseValue) : (0, ramda_1.mapObjIndexed)(parseValue, q);
    const pipeline = this.pipeline();
    for (let i = 0; i < pipeline.length; i++) {
        const stage = pipeline[i];
        if (stage.$match != null) {
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
const applySortedMongooseAdditionalFunctions = (schema) => {
    return applySortPreMiddlewares(applyPreMiddlewares(applyMethods(schema)));
};
exports.applySortedMongooseAdditionalFunctions = applySortedMongooseAdditionalFunctions;
const applyMongooseAdditionalFunctions = (schema) => {
    return applyPreMiddlewares(applyMethods(schema));
};
exports.applyMongooseAdditionalFunctions = applyMongooseAdditionalFunctions;
const applyPreMiddlewares = (schema) => {
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
const applySortPreMiddlewares = (schema) => {
    return schema
        .pre('aggregate', sortByCreatedAtInStages)
        .pre('find', sortByCreatedAt);
};
const applyMethods = (schema) => {
    schema.methods.setDeleted = function () {
        this.deleted_at = new Date();
        return this.save();
    };
    return schema;
};
const idEquals = function (one, other) {
    return one.toString() === other.toString();
};
exports.idEquals = idEquals;
//# sourceMappingURL=base.functions.js.map