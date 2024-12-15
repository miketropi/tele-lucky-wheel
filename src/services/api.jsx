import { db } from './firebase';
import { collection, doc, setDoc, query, getDocs, getDoc, addDoc, where, limit, onSnapshot } from "firebase/firestore"; 

const findUserByTeleID = async (teleID) => {
  const q = query(collection(db, "a1aluckywheel"), where("teleuid", "==", teleID), limit(1));
  const querySnapshot = await getDocs(q);
  let res =  (querySnapshot.empty == false ? querySnapshot.docs[0].data() : false);
  if(res != false) {
    res.__id = querySnapshot.docs[0].id
  }
  return res;
}

const addUser = async (user) => {
  const docRef = await addDoc(collection(db, 'a1aluckywheel'), user);
  return docRef.id;
}

const getGifts = async () => {
  const q = await query(collection(db, 'gifts'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    let d = doc.data();
    d.__id = doc.id
    return d;
  });
}

const updateUser = async (id, data) => {
  const docRef = collection(db, 'a1aluckywheel');
  await setDoc(doc(docRef, id), data, { merge: true });
}

export { findUserByTeleID, addUser, getGifts, updateUser }