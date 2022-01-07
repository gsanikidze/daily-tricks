import React from 'react';
import { GitHub } from 'react-feather';
import { GithubAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import Button from '../Button';
import { logIn } from '../../store/modules/user';

export default function Header() {
  const dispatch = useDispatch();

  const authWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(res);

      if (credential) {
        dispatch(logIn({
          uid: res.user.uid,
          accessToken: credential.accessToken,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header
      className="bg-white shadow dark:bg-gray-800 py-4"
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <h5>
          Daily Tricks
        </h5>
        <Button
          type="default"
          beforeAddon={<GitHub size={16} />}
          onClick={authWithGithub}
        >
          Login With GitHub
        </Button>
      </div>
    </header>
  );
}
