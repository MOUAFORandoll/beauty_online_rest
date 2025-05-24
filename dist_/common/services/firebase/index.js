"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseApp = void 0;
exports.InitFirebaseApp = InitFirebaseApp;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const internal_1 = require("../../errors/internal");
exports.FirebaseApp = null;
function InitFirebaseApp(firebaseServiceAccountPath) {
    if (!firebaseServiceAccountPath)
        throw new internal_1.AppInternalServerError('Invalid firebase service account keys');
    exports.FirebaseApp = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebaseServiceAccountPath),
    });
}
//# sourceMappingURL=index.js.map