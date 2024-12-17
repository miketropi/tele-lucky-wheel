import { useContext, createContext, useState, useEffect } from "react";
import { findUserByTeleID, addUser, getGifts, updateUser, getUsers, listennerCollection, updateGift } from '../services/api';

const AdminViewContext = createContext(null);

const AdminViewContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [gifts, setGifts] = useState([]);

  const onGetUsers_fn = async () => {
    const res = await getUsers();
    setUsers(res);
  }

  const addTotalProbability = (rewards) => {
    const totalProbability = rewards.reduce((sum, reward) => sum + reward.qty, 0);
    return rewards.map(r => {
      r.probability = parseFloat(((r.qty / totalProbability) * 100).toFixed(2));
      return r;
    })
  }

  const onGetGifts_fn = async () => {
    const res = await getGifts();
    setGifts(addTotalProbability(res))
  }

  useEffect(() => {
    const onLoadInit = async () => {
      onGetUsers_fn();
      onGetGifts_fn();
    }

    onLoadInit();

    const l = listennerCollection('gifts', (res) => {
      console.log(res);
      setGifts(addTotalProbability(res))
      // getGifts(res);
    });

    return () => {
      l();
    }
  }, [])
  
  const onPickReward = () => {
    const __gifts = [...gifts];
    const totalProbability = __gifts.reduce((sum, reward) => sum + reward.probability, 0);
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (let i = 0; i < __gifts.length; i++) {
      cumulativeProbability += __gifts[i].probability;
      if (randomValue <= cumulativeProbability) {
        return __gifts[i];
      }
    }
  }

  const onTestReward = () => {
    let gift = onPickReward();
    console.log(gift.name);
    updateGift(gift.__id, {
      qty: gift.qty - 1,
    })
  }

  const onUpdateQtyGift = (id, qty) => {
    updateGift(id, {
      qty: parseInt(qty),
    })
  }

  const value = {
    users, setUsers,
    gifts, setGifts,
    fn: {
      onTestReward,
      onUpdateQtyGift
    },
  }

  return <AdminViewContext.Provider value={ value } >
    { children }
  </AdminViewContext.Provider>
}

const useAdminViewContext = () => {
  return useContext(AdminViewContext);
}

export { AdminViewContextProvider, useAdminViewContext }