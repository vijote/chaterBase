import {
    CLIENT_ID,
    APP_ID,
    API_KEY,
    DATABASE_URL,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    PROJECT_ID
}  from '@env';

export const generateCredentials = () => {
    return {
        clientId: CLIENT_ID,
        appId: APP_ID,
        apiKey: API_KEY,
        databaseURL: DATABASE_URL,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGE_SENDER_ID,
        projectId: PROJECT_ID,
    }
}