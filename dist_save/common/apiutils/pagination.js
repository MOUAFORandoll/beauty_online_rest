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
exports.PaginationResponseDto = exports.PaginationPayloadDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PaginationPayloadDto {
    constructor() {
        this.page = 1;
        this.size = 15;
    }
}
exports.PaginationPayloadDto = PaginationPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationPayloadDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationPayloadDto.prototype, "size", void 0);
class PaginationResponseDto {
    static responseDto(requestPayload, content, total = 0) {
        const response = new PaginationResponseDto();
        response.page = requestPayload.page;
        response.size = requestPayload.size;
        if (requestPayload.page > 1) {
            response.previous_page = requestPayload.page - 1;
        }
        else if (requestPayload.page * requestPayload.size < total) {
            response.next_page = requestPayload.page + 1;
        }
        response.content = content;
        response.total = total;
        return response;
    }
    map(callbackfn) {
        const response = new PaginationResponseDto();
        response.content = this.content.map(callbackfn, this);
        response.page = this.page;
        response.size = this.size;
        response.previous_page = this.previous_page;
        response.next_page = this.next_page;
        response.total = this.total;
        return response;
    }
    async mapPromise(callbackfn) {
        const response = new PaginationResponseDto();
        response.content = await Promise.all(this.content.map(callbackfn));
        response.page = this.page;
        response.size = this.size;
        response.previous_page = this.previous_page;
        response.next_page = this.next_page;
        response.total = this.total;
        return response;
    }
}
exports.PaginationResponseDto = PaginationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "next_page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "previous_page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PaginationResponseDto.prototype, "content", void 0);
//# sourceMappingURL=pagination.js.map