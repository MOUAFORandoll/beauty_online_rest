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
exports.CreneauxSchema = exports.CRENEAU_MODEL_NAME = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const mongoose_2 = require("mongoose");
const base_functions_1 = require("../../base.functions");
const agendas_schema_1 = require("./agendas.schema");
exports.CRENEAU_MODEL_NAME = 'creneaux';
let CreneauSchema = class CreneauSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreneauSchema.prototype, "startTimeAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CreneauSchema.prototype, "endTimeAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: agendas_schema_1.AGENDA_MODEL_NAME,
    }),
    __metadata("design:type", String)
], CreneauSchema.prototype, "agenda_id", void 0);
CreneauSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.CRENEAU_MODEL_NAME })
], CreneauSchema);
exports.CreneauxSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(CreneauSchema));
//# sourceMappingURL=creneaux.schema.js.map