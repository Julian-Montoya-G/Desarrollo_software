import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/config";


export function useFirebaseAuth() {

  const login = async (email, password) => {

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return result.user;
  };


  const register = async (email, password) => {

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return result.user;
  };


  const logout = async () => {

    await signOut(auth);

  };


  return {
    login,
    register,
    logout
  };

}