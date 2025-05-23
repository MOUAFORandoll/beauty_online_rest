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
exports.RendezVoussSchema = exports.RENDEZ_VOUS_MODEL_NAME = exports.StatusRendezVous = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_schema_1 = require("../../base.schema");
const mongoose_2 = require("mongoose");
const base_functions_1 = require("../../base.functions");
const entities_1 = require("../../users/entities");
const realisations_schema_1 = require("./realisations.schema");
const creneaux_schema_1 = require("./creneaux.schema");
var StatusRendezVous;
(function (StatusRendezVous) {
    StatusRendezVous["ATTENTE"] = "EN ATTENTE";
    StatusRendezVous["ACCEPTER"] = "ACCEPTE";
    StatusRendezVous["REFUSER"] = "REFUSE";
})(StatusRendezVous || (exports.StatusRendezVous = StatusRendezVous = {}));
exports.RENDEZ_VOUS_MODEL_NAME = 'rendez_vous';
let RendezVousSchema = class RendezVousSchema extends base_schema_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: StatusRendezVous }),
    __metadata("design:type", String)
], RendezVousSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: entities_1.USER_MODEL_NAME }),
    __metadata("design:type", String)
], RendezVousSchema.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: realisations_schema_1.REALISATION_MODEL_NAME }),
    __metadata("design:type", String)
], RendezVousSchema.prototype, "realisation_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: creneaux_schema_1.CRENEAU_MODEL_NAME }),
    __metadata("design:type", String)
], RendezVousSchema.prototype, "creneau_id", void 0);
RendezVousSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: exports.RENDEZ_VOUS_MODEL_NAME })
], RendezVousSchema);
exports.RendezVoussSchema = (0, base_functions_1.applySortedMongooseAdditionalFunctions)(mongoose_1.SchemaFactory.createForClass(RendezVousSchema));
//# sourceMappingURL=rendez_vous.schema.js.map