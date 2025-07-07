import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBmj8nkiI_yujB5Kf3syyCD3iV6UfHkHXk",
  authDomain: "collegeprep-1cb67.firebaseapp.com",
  projectId: "collegeprep-1cb67",
  storageBucket: "collegeprep-1cb67.firebasestorage.app",
  messagingSenderId: "803893054912",
  appId: "1:803893054912:web:24efdcefa8ba1476208c25",
  measurementId: "G-E95TE5XMHD",
  databaseURL: "https://collegeprep-1cb67-default-rtdb.firebaseio.com"
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);   