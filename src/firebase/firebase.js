import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAPYdubf7dZtT279DRkoVkdrrNCmO8r_tM",
//   authDomain: "travelmate-d6764.firebaseapp.com",
//   projectId: "travelmate-d6764",
//   storageBucket: "travelmate-d6764.appspot.com",
//   messagingSenderId: "488973057926",
//   appId: "1:488973057926:web:e92d314fa854f9837ff607",
//   measurementId: "G-H50X7PVX8F",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAmCRD0kcqxTBYFS5NU1H7zL_8eVITcBFc",
  authDomain: "travel-mate-355be.firebaseapp.com",
  projectId: "travel-mate-355be",
  storageBucket: "travel-mate-355be.appspot.com",
  messagingSenderId: "1088858863469",
  appId: "1:1088858863469:web:9852c2ad72d61d4cb3cc64",
  measurementId: "G-FEFNY41JVT",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const analytics = getAnalytics();
logEvent(analytics, "notification_received");
