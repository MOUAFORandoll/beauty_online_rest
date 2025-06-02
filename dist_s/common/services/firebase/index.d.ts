import { app } from 'firebase-admin';
import App = app.App;
export declare let FirebaseApp: App | null;
export declare function InitFirebaseApp(firebaseServiceAccountPath: string): void;
