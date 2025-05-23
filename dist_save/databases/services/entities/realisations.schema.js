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
exports.RealisationFilesSchema = exports.REALISATION_FILE_MODEL_NAME = exports.RealisationsSchema = exports.REALISATION_MODEL_NAME = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const mongoose_2 = require("mongoose");
const base_functions_1 = require("../../base.functions");
const entities_1 = require("../../users/entities");
exports.REALISATION_MODEL_NAME = 'realisations';
let RealisationSchema = class RealisationSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RealisationSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RealisationSchema.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: entities_1.PROFILE_PRO_MODEL_NAME }),
    __metadata("design:type", String)
], RealisationSchema.prototype, "profile_professionnel_id", void 0);
RealisationSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.REALISATION_MODEL_NAME })
], RealisationSchema);
exports.RealisationsSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(RealisationSchema));
exports.REALISATION_FILE_MODEL_NAME = 'realisation_files';
let RealisationFileSchema = class RealisationFileSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: exports.REALISATION_MODEL_NAME }),
    __metadata("design:type", String)
], RealisationFileSchema.prototype, "realisation_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RealisationFileSchema.prototype, "file_path", void 0);
RealisationFileSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.REALISATION_FILE_MODEL_NAME })
], RealisationFileSchema);
exports.RealisationFilesSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(RealisationFileSchema));
//# sourceMappingURL=realisations.schema.js.map