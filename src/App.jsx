import { useState } from 'react'
import './App.scss'
import { useLuckyWheelContext } from './context/AppContext';
import LuckyWheel from './components/LuckyWheel';
import UserInfo from './components/UserInfo';
import randomColor from 'randomcolor';


import WebApp from '@twa-dev/sdk'

function App() {
  const { user, gifts, fn } = useLuckyWheelContext(); 
  const { onUpdateUserGift } = fn;

  const wheel = (
    gifts.length > 0 && <LuckyWheel gifts={ gifts.map(g => {
      return { option: g.name, style: { backgroundColor: randomColor({luminosity: 'light'}) } }
    } ) } onHandleSpinFinish={ res => {
      // console.log(res);
      // alert(res)
      onUpdateUserGift(res);
    } } />
  )
  return (
    <>
      <UserInfo />
      {/* { JSON.stringify(user) } */}
      { 
        user?.gift ? <>
          <p>Cảm ơn bạn đã tham gia chương trình, phần quà của bạn là <strong style={{ background: 'black' }}>{ user.gift }</strong></p>
        </> : wheel
      }
      
    </>
  )
}

export default App