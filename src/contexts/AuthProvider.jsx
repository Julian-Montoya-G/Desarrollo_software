import {
  useEffect,
  useState
} from "react";

import {
  supabase
} from "../lib/supabase";

import {
  useSupabaseAuth
} from "../hooks/useSupabaseAuth";

import AuthContext from "./AuthContext";


function AuthProvider({
  children
}) {

  const [
    user,
    setUser
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const {
    login,
    register,
    logout
  } = useSupabaseAuth();


  useEffect(() => {

    let mounted = true;


    const loadSession =
      async () => {

        const {
          data,
          error
        } = await supabase.auth.getSession();


        if (error) {

          console.error(
            "Error obteniendo sesión:",
            error
          );

        }


        if (mounted) {

          setUser(
            data?.session?.user ||
            null
          );

          setLoading(false);

        }

      };


    loadSession();


    const {
      data
    } = supabase.auth.onAuthStateChange(

      (
        event,
        session
      ) => {

        setUser(
          session?.user ||
          null
        );

      }

    );


    return () => {

      mounted = false;

      data.subscription.unsubscribe();

    };

  }, []);


  const value = {

    user,

    login,

    register,

    logout,

    loading

  };


  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

}


export default AuthProvider;