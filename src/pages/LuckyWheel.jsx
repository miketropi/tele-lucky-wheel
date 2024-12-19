import { useLuckyWheelContext } from "../context/AppContext";
import LuckyWheelComp from "../components/LuckyWheelComp";
import randomColor from 'randomcolor';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LuckyWheel() {
  const navigation = useNavigate();
  const { user, gifts, giftColors, setReward, fn } = useLuckyWheelContext(); 
  const { onUpdateUserGift } = fn;

  const wheel = (
    gifts.length > 0 && <LuckyWheelComp onHandleSpinFinish={ res => {
      setReward(res);
      setTimeout(() => { 
        navigation('/thankyou')
      }, 2000)
      // console.log(res)
      // onUpdateUserGift(res);
      // setTimeout(() => {
      //   navigate("/update-contact"); 
      // }, 1000)
    } } />
  )

  return <>
    <div className="background-layer"></div> 
    <div className="luckywheel-container __container">
      <div className="__container__inner-transparent">
        { wheel }
      </div>
    </div>
  </>
}