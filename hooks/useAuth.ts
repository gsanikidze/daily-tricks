import {
  getAuth, GithubAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getStoredUser, logIn, logOut as logOutAction } from '../store/modules/user';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((st) => st.user.isAuthorized);
  const auth = getAuth();
  const user = useAppSelector((st) => st.user);

  const authWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      const userJson = res.user.toJSON() as any;

      if (userJson.stsTokenManager.accessToken) {
        dispatch(logIn({
          uid: res.user.uid,
          tokenManager: userJson.stsTokenManager,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }, [auth, dispatch]);

  const logOut = useCallback(async () => {
    dispatch(logOutAction());
    auth.signOut();
  }, [auth, dispatch]);

  useEffect(() => {
    dispatch(getStoredUser({}));
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthorized && user.profile.tokenManager) {
      const isTokenExpired = user.profile.tokenManager.expirationTime - Date.now() <= 0;

      if (isTokenExpired) {
        logOut();
      }
    }
  }, [logOut, user.isAuthorized, user.profile.tokenManager]);

  return {
    isAuthorized,
    authWithGithub,
    logOut,
  };
};

export default useAuth;
