// // lib/firebase.js
// // import { initializeApp } from 'firebase/app';
// // import { getAuth } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCG1-wFsHRoWQtjvcweiaOYbrJ1j2g_M9w",
// //   authDomain: "sampleproject-7e767.firebaseapp.com",
// //   projectId: "sampleproject-7e767",
// //   storageBucket: "sampleproject-7e767.appspot.com", // fixed typo here
// //   messagingSenderId: "13572781852",
// //   appId: "1:13572781852:web:f7727309d21e00aaac6cd9",
// //   measurementId: "G-4SP5GFNG4B"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// // // Initialize services
// // const auth = getAuth(app);
// // const db = getFirestore(app);

// // // Export them
// // export { auth, db };

// // lib/firebase.js
// // import { initializeApp } from 'firebase/app';
// // import { getAuth } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCG1-wFsHRoWQtjvcweiaOYbrJ1j2g_M9w",
// //   authDomain: "sampleproject-7e767.firebaseapp.com",
// //   projectId: "sampleproject-7e767",
// //   storageBucket: "sampleproject-7e767.appspot.com",
// //   messagingSenderId: "13572781852",
// //   appId: "1:13572781852:web:f7727309d21e00aaac6cd9",
// //   measurementId: "G-4SP5GFNG4B"
// // };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const db = getFirestore(app);

// // export { auth, db };

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'; // ✅ Only added line

// const firebaseConfig = {
//   apiKey: "AIzaSyCG1-wFsHRoWQtjvcweiaOYbrJ1j2g_M9w",
//   authDomain: "sampleproject-7e767.firebaseapp.com",
//   projectId: "sampleproject-7e767",
//   storageBucket: "sampleproject-7e767.appspot.com",
//   messagingSenderId: "13572781852",
//   appId: "1:13572781852:web:f7727309d21e00aaac6cd9",
//   measurementId: "G-4SP5GFNG4B"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app); // ✅ Only added line

// export { auth, db, storage }; // ✅ Only modified export


// app/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG1-wFsHRoWQtjvcweiaOYbrJ1j2g_M9w",
  authDomain: "sampleproject-7e767.firebaseapp.com",
  projectId: "sampleproject-7e767",
  storageBucket: "sampleproject-7e767.appspot.com",
  messagingSenderId: "13572781852",
  appId: "1:13572781852:web:f7727309d21e00aaac6cd9",
  measurementId: "G-4SP5GFNG4B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, db, storage };