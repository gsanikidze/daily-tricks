import {
  getAuth, GithubAuthProvider, signInWithPopup, getIdToken,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import { getStoredUser, logIn, logOut as logOutAction } from '../store/modules/user';

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthorized = useAppSelector((st) => st.user.isAuthorized);

  const authWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    try {
      const res = await signInWithPopup(auth, provider);
      const credential = await getIdToken(res.user);

      if (credential) {
        dispatch(logIn({
          uid: res.user.uid,
          accessToken: credential,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    dispatch(logOutAction());
  };

  useEffect(() => {
    dispatch(getStoredUser({}));
  }, [dispatch]);

  return {
    isAuthorized,
    authWithGithub,
    logOut,
  };
};

export default useAuth;
