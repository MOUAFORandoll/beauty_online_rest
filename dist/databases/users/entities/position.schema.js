"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsSchema = exports.POSITION_MODEL_NAME = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const mongoose_2 = require("mongoose");
const base_functions_1 = require("../../base.functions");
const users_schema_1 = require("./users.schema");
const profile_schema_1 = require("./profile.schema");
exports.POSITION_MODEL_NAME = 'positions';
let PositionSchema = class PositionSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PositionSchema.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PositionSchema.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PositionSchema.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PositionSchema.prototype, "town", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PositionSchema.prototype, "titleEmplacement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Schema.Types.ObjectId }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: users_schema_1.USER_MODEL_NAME }),
    __metadata("design:type", String)
], PositionSchema.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Schema.Types.ObjectId }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: profile_schema_1.PROFILE_PRO_MODEL_NAME }),
    __metadata("design:type", String)
], PositionSchema.prototype, "profile_professionnel_id", void 0);
PositionSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.POSITION_MODEL_NAME })
], PositionSchema);
exports.PositionsSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(PositionSchema));
//# sourceMappingURL=position.schema.js.map