import { initializeApp } from 'firebase/app';
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   signInWithRedirect,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyAbgkZX50S_xaZTGQs30u0jiAjX3tj_uFs',
   authDomain: 'crwn-clothing-db-1de48.firebaseapp.com',
   projectId: 'crwn-clothing-db-1de48',
   storageBucket: 'crwn-clothing-db-1de48.appspot.com',
   messagingSenderId: '886400556009',
   appId: '1:886400556009:web:6211dc3421a99a5d044978',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);

   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
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
