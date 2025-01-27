import { useContext, createContext, useState, useEffect } from "react";
import { findUserByTeleID, addUser, getGifts, updateUser, getUsers, listennerCollection, updateGift, getLogs, addReward, deleteDocument, getAppSettings, updateSettings, listennerDocument, clearAllDocument } from '../services/api';

const AdminViewContext = createContext(null);

const AdminViewContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [appSettings, setAppSettings] = useState({});
  const [editSlot, setEditSlot] = useState(false);

  const onGetSettings_fn = async () => {
    let res = await getAppSettings('global_settings');
    setAppSettings(res);
    // console.log('onGetSettings_fn', res);
  }

  const onGetUsers_fn = async () => {
    const res = await getUsers();
    setUsers(res);
  }

  const onGetLogs_fn = async () => {
    const res = await getLogs();
    setLogs(res);
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
      onGetLogs_fn();
      onGetSettings_fn();
    }

    onLoadInit();

    const g = listennerCollection('gifts', (res) => {
      setGifts(addTotalProbability(res))
    });

    const u = listennerCollection('a1aluckywheel', (res) => {
      setUsers(res);
    })

    const l = listennerCollection('gift_logs', (res) => {
      setLogs(res);
    })

    const s = listennerDocument('settings', 'global_settings', (res) => {
      setAppSettings(res);
    })

    return () => {
      g();
      u();
      l();
      s();
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

  const onTestReward = async () => {
    const result = await fetch(`https://widgets-n2dvrqiy7q-uc.a.run.app/get-reward`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: 'BIZwjWL3jhJdwAuytIlF' }),
    }).then(async res => {
      return await res.json();
    });

    console.log(result);
  }

  const onUpdateQtyGift = (id, qty) => {
    updateGift(id, {
      qty: parseInt(qty),
    })
  }

  const onUpdateNameGift = (id, name) => {
    updateGift(id, {
      name: name,
    })
  }

  const onAddReward = async () => {
    let rewardName = prompt("Please enter name reward:", "");
    if (rewardName == null || rewardName == "") return;

    return await addReward(rewardName, 0);
  }

  const onDeleteRewardItem = async (id) => {
    await deleteDocument('gifts', id)
  }

  const onUpdateSetting = async (id, data) => {
    updateSettings(id, data)
  }

  const onClearAllUser = () => {
    clearAllDocument('a1aluckywheel');
  }

  const value = {
    users, setUsers,
    gifts, setGifts,
    logs, setLogs,
    editSlot, setEditSlot,
    appSettings, setAppSettings,
    fn: {
      onTestReward,
      onUpdateQtyGift,
      onAddReward,
      onUpdateNameGift,
      onDeleteRewardItem,
      onUpdateSetting,
      onClearAllUser,
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