import {
  useEffect,
  useState
} from "react";

import {
  Network
} from "@capacitor/network";


function useNetwork() {

  const [
    isOnline,
    setIsOnline
  ] = useState(true);


  useEffect(() => {

    const checkNetwork =
      async () => {

        const status =
          await Network.getStatus();

        setIsOnline(
          status.connected
        );

      };


    checkNetwork();


    let listener;


    const setupListener =
      async () => {

        listener =
          await Network.addListener(
            "networkStatusChange",
            (status) => {

              setIsOnline(
                status.connected
              );

            }
          );

      };


    setupListener();


    return () => {

      if (listener) {

        listener.remove();

      }

    };

  }, []);


  return {
    isOnline
  };

}


export default useNetwork;