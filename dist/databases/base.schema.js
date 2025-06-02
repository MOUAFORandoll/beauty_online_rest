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
exports.BaseEntitySchema = exports.BaseSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let BaseSchema = class BaseSchema {
    setDeleted() {
        throw new common_1.NotImplementedException();
    }
};
exports.BaseSchema = BaseSchema;
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: () => Date.now(),
        index: true,
    }),
    __metadata("design:type", Number)
], BaseSchema.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], BaseSchema.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Date)
], BaseSchema.prototype, "deleted_at", void 0);
exports.BaseSchema = BaseSchema = __decorate([
    (0, mongoose_1.Schema)()
], BaseSchema);
exports.BaseEntitySchema = mongoose_1.SchemaFactory.createForClass(BaseSchema);
//# sourceMappingURL=base.schema.js.map