import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCI5YcjYf5qw68f_u1yc_J56-eXPIdwi3Q",
  authDomain: "hackathoncsi-9dc45.firebaseapp.com",
  projectId: "hackathoncsi-9dc45",
  storageBucket: "hackathoncsi-9dc45.firebasestorage.app",
  messagingSenderId: "414781335628",
  appId: "1:414781335628:web:ababd11482442b6b216ce9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFile = async (file) => {
    console.log("Uploading file:", file.name);
    const fileRef = ref(storage, `files/${file.name + v4()}`);
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef);
    console.log("File uploaded successfully. URL:", url);
    return url;
};

export default uploadFile;
