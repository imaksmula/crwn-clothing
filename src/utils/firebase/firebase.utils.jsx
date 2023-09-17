import { initializeApp } from 'firebase/app';
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
   signInWithRedirect,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: 'select_account',
});

// `auth` keeps track of the authentication state for the entire application.
// It provides access to Firebase Authentication services and the current user's authentication status.
export const auth = getAuth();

export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   //Get a reference to the user's document in the 'users' collection. Stores in user's memory. Does not make any queries to Firebase.
   const userDocRef = doc(db, 'users', userAuth.uid);

   //Fetch the document from the Firestore database
   const userSnapshot = await getDoc(userDocRef);

   // Check if the document exists in the Firestore database
   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         // If the document does not exist, create it with the following data
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
         });
      } catch (error) {
         console.log('error creating the user', error.message);
      }
   }

   return userDocRef;
};
