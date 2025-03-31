import FirebaseAdmin, { app } from 'firebase-admin';
import App = app.App;

import { AppInternalServerError } from 'src/common/errors/internal';

export let FirebaseApp: App | null = null;

export function InitFirebaseApp(firebaseServiceAccountPath: string) {
    if (!firebaseServiceAccountPath)
        throw new AppInternalServerError('Invalid firebase service account keys');

    FirebaseApp = FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(firebaseServiceAccountPath),
    });
}
