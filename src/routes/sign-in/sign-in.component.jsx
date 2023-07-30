import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
   auth,
   signInWithGooglePopup,
   signInWithGoogleRedirect,
   createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getRedirectResult(auth);

            if (response) {
               const userDocRef = await createUserDocumentFromAuth(
                  response.user
               );
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();

      const userDocRef = await createUserDocumentFromAuth(user);
   };

   return (
      <div>
         <p>Sign In Page</p>
         <button onClick={logGoogleUser}>Sign in with Google Popup</button>
         <button onClick={signInWithGoogleRedirect}>
            Sign in with Google Redirect
         </button>
      </div>
   );
};

export default SignIn;
