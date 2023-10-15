import {
  collection,
  query,
  getFirestore,
  getDocs,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";

const db = getFirestore(app);

export const useFireFetch = () => {
  const [data, setData] = useState([]);

  const getData = (initialCollection, key = null, value = null) => {
    useEffect(() => {
      const get = async () => {
        try {
          if (key) {
            const Ref = collection(db, initialCollection);
            const q = query(Ref, where(key, "==", value));
            const querySnapshot = await getDocs(q);
            const userData = [];

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
            });

            setData(userData);
          } else {
            const Ref = collection(db, initialCollection);
            const querySnapshot = await getDocs(Ref);
            const userData = [];

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
            });

            setData(userData);
          }
        } catch (error) {
          console.error(error);
        }
      };
      get();
    }, [initialCollection]);

    return data;
  };

  const postData = (initialCollection, id, data) => {
    const set = async () => {
      try {
        await setDoc(doc(db, initialCollection, id), data);

        setData((prev) => [data, ...prev]);
        console.log("성공");
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  return { getData, postData };
};
