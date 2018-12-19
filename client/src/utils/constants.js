export const FILE_TYPES = ["image/jpeg", "image/png"];
export const CAPTION_LENGTH = 280;

export const SHARE_VIA = "fotobom.us";
export const MAX_FILE_SIZE = 10000000; //10 MB

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DB_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MSG_SENDER_ID
};

export const JWT_KEY = process.env.REACT_APP_JWT_KEY;
