import { db } from './firebase';
import { collection, doc, setDoc, query, orderBy, getDocs, getDoc, addDoc, where, limit, onSnapshot } from "firebase/firestore"; 

const getUsers = async () => {
  const q = await query(collection(db, 'a1aluckywheel'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    let d = doc.data();
    d.__id = doc.id
    return d;
  });
}

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

const updateGift = async (id, data) => {
  const docRef = collection(db, 'gifts');
  await setDoc(doc(docRef, id), data, { merge: true });
}

const listennerCollection = (collecton, callback) => {
  const unsubscribe = onSnapshot(collection(db, collecton), (snapshot) => {
    let res =  snapshot.docs.map(doc => {
      let d = doc.data();
      d.__id = doc.id
      return d;
    });
    callback(res);
  })

  return unsubscribe;
}

const listennerDoc = (collection, doc_id, callback) => {
  const unsub = onSnapshot(doc(db, collection, doc_id), (doc) => {
    let d = doc.data();
    d.__id = doc.id
    callback(d);
  });

  return unsub;
}

const addLog = async (userinfo, reward) => {
  const docRef = await addDoc(collection(db, 'gift_logs'), {
    userinfo,
    reward,
    date: new Date(),
  });
  return docRef.id;
}

const getLogs = async () => {
  const q = await query(collection(db, 'gift_logs'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    let d = doc.data();
    d.__id = doc.id
    return d;
  });
}

const getRequest = async (request_id) => {
  const docRef = doc(db, "request_rewards", request_id);
  const docSnap = await getDoc(docRef);
  
  return {
    __id: docSnap.id,
    ...docSnap.data()
  }
}

export { findUserByTeleID, addUser, getGifts, updateUser, getUsers, listennerCollection, updateGift, addLog, getRequest, listennerDoc, getLogs }
