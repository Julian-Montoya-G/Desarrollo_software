import {
  supabase
} from "../lib/supabase";


export function useSupabaseAuth() {

  const login = async (
    email,
    password
  ) => {

    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({

      email,

      password

    });


    if (error) {

      throw error;

    }


    return data.user;

  };


  const register = async (
    email,
    password
  ) => {

    const {
      data,
      error
    } = await supabase.auth.signUp({

      email,

      password

    });


    if (error) {

      throw error;

    }


    return data.user;

  };


  const logout = async () => {

    const {
      error
    } = await supabase.auth.signOut();


    if (error) {

      throw error;

    }

  };


  return {

    login,

    register,

    logout

  };

}