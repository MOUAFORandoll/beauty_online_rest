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
const excludeDeleted = function (next) {
    this.where({ deleted_at: null });
    next();
};
const sortByCreatedAt = function (next) {
    this.sort({ created_at: -1 });
    next();
};
const castObjectIDs = function (next) {
    const isObjectId = (v) => {
        const regex = /^[a-f\d]{24}$/i;
        return typeof v === 'string' && mongoose_1.default.Types.ObjectId.isValid(v) && regex.test(v);
    };
    const toObjectId = (v) => new mongoose_1.default.Types.ObjectId(v);
    const isPrimitive = (v) => typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'undefined' ||
        v === null ||
        v instanceof RegExp ||
        typeof v === 'string' ||
        v instanceof Date;
    const parseValue = (v) => isObjectId(v) ? toObjectId(v) : isPrimitive(v) ? v : parseQuery(v);
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
const excludeDeletedInAggregation = function (next) {
    this.pipeline().unshift({ $match: { deleted_at: null } });
    next();
};
const sortByCreatedAtInAggregation = function (next) {
    this.pipeline().unshift({ $sort: { created_at: -1 } });
    next();
};
const applyPreMiddlewares = (schema) => {
    return schema
        .pre('save', preSave)
        .pre('aggregate', excludeDeletedInAggregation)
        .pre('aggregate', castObjectIDs)
        .pre('countDocuments', excludeDeleted)
        .pre('updateMany', excludeDeleted)
        .pre('updateOne', excludeDeleted)
        .pre('find', excludeDeleted)
        .pre('findOne', excludeDeleted);
};
const applySortPreMiddlewares = (schema) => {
    return schema.pre('aggregate', sortByCreatedAtInAggregation).pre('find', sortByCreatedAt);
};
const applyMethods = (schema) => {
    schema.methods.setDeleted = function () {
        this.deleted_at = new Date();
        return this.save();
    };
    schema.methods.restore = function () {
        this.deleted_at = null;
        return this.save();
    };
    return schema;
};
const applySortedMongooseAdditionalFunctions = (schema) => {
    return applySortPreMiddlewares(applyPreMiddlewares(applyMethods(schema)));
};
exports.applySortedMongooseAdditionalFunctions = applySortedMongooseAdditionalFunctions;
const applyMongooseAdditionalFunctions = (schema) => {
    return applyPreMiddlewares(applyMethods(schema));
};
exports.applyMongooseAdditionalFunctions = applyMongooseAdditionalFunctions;
const idEquals = (one, other) => {
    return one.toString() === other.toString();
};
exports.idEquals = idEquals;
//# sourceMappingURL=base.functions.js.map