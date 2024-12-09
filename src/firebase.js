import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUGj_7Rk4DBR4x5pfWRR3t8z1Y_RWK0KU",
  authDomain: "player-stats-viewer.firebaseapp.com",
  databaseURL: "https://player-stats-viewer-default-rtdb.firebaseio.com",
  projectId: "player-stats-viewer",
  storageBucket: "player-stats-viewer.appspot.com",
  messagingSenderId: "721147233436",
  appId: "1:721147233436:web:dd7f2e5af00e606b461959",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
