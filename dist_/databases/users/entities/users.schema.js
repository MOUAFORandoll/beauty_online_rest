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
exports.UsersSchema = exports.USER_MODEL_NAME = exports.UserType = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const base_functions_1 = require("../../base.functions");
var UserType;
(function (UserType) {
    UserType["DEFAULT"] = "CLIENT";
    UserType["PROFESSIONNEL"] = "PROFESSIONNEL";
    UserType["ADMIN"] = "ADMIN";
})(UserType || (exports.UserType = UserType = {}));
exports.USER_MODEL_NAME = 'users';
let UserSchema = class UserSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "codePhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: UserType }),
    __metadata("design:type", String)
], UserSchema.prototype, "typeUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Picture of the user',
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "pictureUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Firebase identifiant of the user',
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "firebaseUID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Firebase notification token of the user',
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "firebaseNotificationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Email address of the user',
    }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'authProvider of the user',
    }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "authProvider", void 0);
UserSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.USER_MODEL_NAME })
], UserSchema);
exports.UsersSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(UserSchema));
//# sourceMappingURL=users.schema.js.map