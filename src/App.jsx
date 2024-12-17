import { useState } from 'react'
import './App.scss'
import { Link } from "react-router-dom";
import { useLuckyWheelContext } from './context/AppContext';
import LuckyWheel from './components/LuckyWheel';
import UserInfo from './components/UserInfo';
import randomColor from 'randomcolor';
import { useNavigate } from "react-router-dom";


import WebApp from '@twa-dev/sdk'

function App() {
  const navigate = useNavigate();
  const { user, gifts, fn } = useLuckyWheelContext(); 
  const { onUpdateUserGift } = fn;

  const wheel = (
    gifts.length > 0 && <LuckyWheel gifts={ gifts.map(g => {
      return { option: g.name, style: { backgroundColor: randomColor({luminosity: 'light'}) } }
    } ) } onHandleSpinFinish={ res => {
      // console.log(res); 
      // alert(res)
      onUpdateUserGift(res);
      setTimeout(() => {
        navigate("/update-contact"); 
      }, 1000)
    } } />
  )
  return (
    <>
      <UserInfo />
      {/* { JSON.stringify(user) } */}
      { 
        user?.gift ? <>
          <p>Cảm ơn bạn đã tham gia chương trình, phần quà của bạn là <strong style={{ background: 'black' }}>{ user.gift }</strong></p>
          <Link className="button" to="/update-contact">Cập nhật thông tin liên hệ</Link>
        </> : wheel
      } 
    </>
  )
}

export default App