import { createContext, useContext, useState, useEffect } from "react";
import { findUserByTeleID, addUser, getGifts, updateUser } from '../services/api';

const LuckyWheelContext = createContext(null);

const LuckyWheelContextPrivider = ({ children, WebApp }) => {
  const [user, setUser] = useState(null); 
  const [gifts, setGifts] = useState([]);

  const onGetGifts = async () => {
    const res = await getGifts();
    setGifts(res)
  }

  useEffect(() => {
    const __query = async () => {
      let __u = await findUserByTeleID(WebApp.initDataUnsafe?.user?.id);
      // alert(JSON.stringify(__u))
      // alert('userExists', JSON.stringify(userExists), WebApp.initDataUnsafe?.user?.id)
      if(__u == false) {
        __u = await addNewUser(WebApp.initDataUnsafe?.user);
        setUser(__u);
      }
      setUser(__u);
    }
    __query();
    onGetGifts();
  }, [])

  const addNewUser = async (teleUser) => {
    const newUser = {
      tele_userinfo_full: teleUser, 
      teleuid: teleUser?.id,
      gift: '',
      update_info: {},
    }
    const uid = await addUser(newUser);
    return { ...newUser, __id: uid }
  }

  const onUpdateUserGift = async (gift) => {
    await updateUser(user.__id, {
      gift
    })

    let _user = { ...user };
    _user.gift = gift;
    setUser(_user);
  }

  const onUpdateUserInfo = async (update_info) => {
    await updateUser(user.__id, {
      update_info
    })
  }

  const value = {
    version: '1.0.0',
    teleUser: WebApp.initDataUnsafe,
    user, setUser,
    gifts, setGifts,
    fn: {
      onUpdateUserGift,
      onUpdateUserInfo,
    }
  }

  return <LuckyWheelContext.Provider value={ value } >
    { children }
  </LuckyWheelContext.Provider>
}

const useLuckyWheelContext = () => {
  return useContext(LuckyWheelContext);
}

export { useLuckyWheelContext, LuckyWheelContextPrivider }