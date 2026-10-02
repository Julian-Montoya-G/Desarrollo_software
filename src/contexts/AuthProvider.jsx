import {
  useEffect,
  useState
} from "react";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../firebase/config";

import {
  useFirebaseAuth
} from "../hooks/useFirebaseAuth";

import AuthContext from "./AuthContext";


function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  const {
    login,
    register,
    logout
  } = useFirebaseAuth();


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      }
    );


    return unsubscribe;

  }, []);


  const value = {
    user,
    login,
    register,
    logout,
    loading
  };


  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}


export default AuthProvider;