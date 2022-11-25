import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0IkxErHlKEgwG1ADBCvbSTKFeyClLgPc",
  authDomain: "todolist-fc63a.firebaseapp.com",
  projectId: "todolist-fc63a",
  storageBucket: "todolist-fc63a.appspot.com",
  messagingSenderId: "864514080193",
  appId: "1:864514080193:web:d05dce686aaed164020340"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
export {db,storage};



// const uploadTask = uploadBytesResumable(sotrageRef, file);

// uploadTask.on(
//   "state_changed",
//   (snapshot) => {
//     const prog = Math.round(
//       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     );
//     setProgress(prog);
//   },
//   (error) => console.log(error),
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log("File available at", downloadURL);
//     });
//   }
// );