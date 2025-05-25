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
exports.StringsHelperService = void 0;
const common_1 = require("@nestjs/common");
let StringsHelperService = class StringsHelperService {
    constructor() { }
    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    replaceAll(str, match, replacement) {
        return str.replace(new RegExp(this.escapeRegExp(match), 'g'), () => this.trimToEmpty(replacement));
    }
    trimToEmpty(_str) {
        let str = _str;
        if (str == null)
            str = '';
        while (str.endsWith(' ') ||
            str.endsWith('\n') ||
            str.endsWith('\r') ||
            str.endsWith('\t')) {
            str = str.substring(0, str.length - 1);
        }
        while (str.startsWith(' ') ||
            str.startsWith('\n') ||
            str.startsWith('\r') ||
            str.startsWith('\t')) {
            str = str.substring(1);
        }
        return str;
    }
    isStrEmpty(_str) {
        return this.trimToEmpty(_str) === '';
    }
    normalizeNFD(str) {
        return str == null
            ? ''
            : str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
};
exports.StringsHelperService = StringsHelperService;
exports.StringsHelperService = StringsHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StringsHelperService);
//# sourceMappingURL=strings_helper.service.js.map