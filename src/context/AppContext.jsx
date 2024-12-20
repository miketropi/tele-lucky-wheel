import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { findUserByTeleID, addUser, getGifts, updateUser, listennerCollection, updateGift, addLog, getRequest, listennerDoc } from '../services/api';
import randomColor from 'randomcolor';

const LuckyWheelContext = createContext(null);

const LuckyWheelContextPrivider = ({ children, WebApp }) => {
  const [user, setUser] = useState(null); 
  const [gifts, setGifts] = useState([]);
  const [giftColors, setGiftColors] = useState([]);
  const [reward, setReward] = useState(null);

  const addTotalProbability = (rewards) => {
    const totalProbability = rewards.reduce((sum, reward) => sum + reward.qty, 0);
    return rewards.map(r => {
      r.probability = parseFloat(((r.qty / totalProbability) * 100).toFixed(2));
      return r;
    })
  }

  const onGetGifts = async () => {
    const res = await getGifts();
    setGiftColors([...res].map(r => {
      return randomColor({luminosity: 'light'})
    }))
    setGifts(addTotalProbability(res))
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
      setReward(__u?.gift)
    }
    __query();
    onGetGifts();

    const l = listennerCollection('gifts', (res) => {
      console.log(res);
      setGifts(addTotalProbability(res))
      // getGifts(res);
    });

    return () => {
      l();
    }
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

  const onPickReward = useCallback(() => {
    const __gifts = [...gifts];
    console.log(__gifts.filter(g => g.qty > 0)) 
    const totalProbability = __gifts.reduce((sum, reward) => sum + reward.probability, 0);
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (let i = 0; i < __gifts.length; i++) {
      cumulativeProbability += __gifts[i].probability;
      if (randomValue <= cumulativeProbability) {
        return __gifts[i];
      }
    }
  }, [gifts])

  const onSpin = useCallback(async (g) => {
    console.log('onSpin', g.filter(_g => _g.qty > 0));
    let reward = onPickReward(); 
    console.log(reward?.name)
    updateGift(reward.__id, { qty: reward.qty - 1 });
    onUpdateUserGift(reward.name);
    addLog(user, reward.name);
    return gifts.findIndex(g => g.__id == reward.__id);
  }, [gifts])

  const onSpin2 = async (cb) => {
    const rid = await fetch(`https://widgets-n2dvrqiy7q-uc.a.run.app/get-reward-v2`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: user.__id }),
    }).then(r => {
      return r.json();
    }).then(async r => {
      return r.request.requestID;
    })
    console.log(rid); 

    const usub = listennerDoc('request_rewards', rid, doc => {
      // console.log(doc);
      if(doc.status == "in-progress") return;
      cb(doc.response);
      usub();
    })
  } 

  const value = {
    version: '1.0.0',
    teleUser: WebApp.initDataUnsafe,
    user, setUser,
    gifts, setGifts,
    giftColors,
    reward, setReward,
    fn: {
      onUpdateUserGift,
      onUpdateUserInfo,
      onSpin,
      onSpin2,
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