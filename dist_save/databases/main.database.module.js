"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const main_database_connection_1 = require("./main.database.connection");
const providers_1 = require("./users/providers");
let MainDatabaseModule = class MainDatabaseModule {
};
exports.MainDatabaseModule = MainDatabaseModule;
exports.MainDatabaseModule = MainDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
                connectionName: main_database_connection_1.DATABASE_CONNECTION,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: main_database_connection_1.USER_MODEL_NAME, schema: main_database_connection_1.UsersSchema },
                { name: main_database_connection_1.POSITION_MODEL_NAME, schema: main_database_connection_1.PositionsSchema },
                { name: main_database_connection_1.PROFILE_PRO_MODEL_NAME, schema: main_database_connection_1.ProfileProfessionnelsSchema },
                { name: main_database_connection_1.REALISATION_MODEL_NAME, schema: main_database_connection_1.RealisationsSchema },
                { name: main_database_connection_1.REALISATION_FILE_MODEL_NAME, schema: main_database_connection_1.RealisationFilesSchema },
                { name: main_database_connection_1.AGENDA_MODEL_NAME, schema: main_database_connection_1.AgendasSchema },
                { name: main_database_connection_1.CRENEAU_MODEL_NAME, schema: main_database_connection_1.CreneauxSchema },
                { name: main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, schema: main_database_connection_1.RendezVoussSchema },
            ], main_database_connection_1.DATABASE_CONNECTION),
        ],
        providers: [providers_1.UsersService],
        exports: [mongoose_1.MongooseModule, providers_1.UsersService],
    })
], MainDatabaseModule);
//# sourceMappingURL=main.database.module.js.map