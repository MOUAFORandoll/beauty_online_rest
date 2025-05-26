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
exports.ProfileProfessionnelsSchema = exports.PROFILE_PRO_MODEL_NAME = exports.ServiceType = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const mongoose_2 = require("mongoose");
const base_functions_1 = require("../../base.functions");
const users_schema_1 = require("./users.schema");
var ServiceType;
(function (ServiceType) {
    ServiceType["COIFFURE"] = "COIFFURE";
    ServiceType["MANICURE"] = "MANICURE";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
exports.PROFILE_PRO_MODEL_NAME = 'profiles_professionnels';
let ProfileProfessionnelSchema = class ProfileProfessionnelSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileProfessionnelSchema.prototype, "namePro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileProfessionnelSchema.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: mongoose_2.Schema.Types.ObjectId }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: users_schema_1.USER_MODEL_NAME }),
    __metadata("design:type", String)
], ProfileProfessionnelSchema.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ServiceType }),
    __metadata("design:type", String)
], ProfileProfessionnelSchema.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'image URL',
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileProfessionnelSchema.prototype, "cover", void 0);
ProfileProfessionnelSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.PROFILE_PRO_MODEL_NAME })
], ProfileProfessionnelSchema);
exports.ProfileProfessionnelsSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(ProfileProfessionnelSchema));
//# sourceMappingURL=profile.schema.js.map