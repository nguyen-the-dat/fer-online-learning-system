

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiZailDdhJkbp4QUIoeC3uA_SvZItgtNM",
  authDomain: "indocs-e3006.firebaseapp.com",
  projectId: "indocs-e3006",
  storageBucket: "indocs-e3006.appspot.com",
  messagingSenderId: "111815465287",
  appId: "1:111815465287:web:2a3c8c19762bb0261cd462",
  measurementId: "G-SV1Z02GL3F"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
