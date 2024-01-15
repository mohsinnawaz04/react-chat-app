import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from 'firebase/database'
import {getAuth , GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC2Xq-2o4X_Nvr-a54dew8hqIWPmkxgYUo",
  authDomain: "reactchatapp-25c7d.firebaseapp.com",
  projectId: "reactchatapp-25c7d",
  storageBucket: "reactchatapp-25c7d.appspot.com",
  messagingSenderId: "85766669287",
  appId: "1:85766669287:web:7f598fdc7efbead42df342"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const dbRef = ref(db)
export const auth = getAuth()
export const googlProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

