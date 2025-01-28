import { useLuckyWheelContext } from "../context/AppContext";
import LuckyWheelComp from "../components/LuckyWheelComp";
import randomColor from 'randomcolor';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CuocPopup = ({ active, onConfirm }) => {
  const { user, setUser, fn } = useLuckyWheelContext();
  const { onUpdateCuocNumber } = fn;
  return <>
    <div className={ ['cuoc-popup', active ? '__active' : ''].join(' ') }>
      <div className="cuoc-popup__inner">
        <h4>Nhập số tháng muốn cược.</h4>
        {/* { JSON.stringify(user) } */}
        <p>
          <input type="number" value={ user?.cuoc } onChange={ e => {
           setUser(preState => {
            return {
              ...preState,
              cuoc: e.target.value,
            }
           })
           onUpdateCuocNumber(e.target.value);
          } } />
        </p>
        <button onClick={ onConfirm } className={ ['button', (user.cuoc ? '' : '__btn-disable')].join(' ') }>Xác Nhận { user.cuoc ? `(${ user.cuoc } tháng)` : '' }</button>
      </div>
    </div>
  </>
}

export default function LuckyWheel() {
  const [ cuocPopup, setCuocPopup ] = useState(true);
  const [ lock, setLock ] = useState(false);
  const navigation = useNavigate();
  const { user, gifts, giftColors, setReward, fn, appSettings } = useLuckyWheelContext(); 
  const { onUpdateUserGift } = fn;

  const wheel = (
    gifts.length > 0 && <LuckyWheelComp 
      onStart={ () => {
        setLock(true);
      } }
      onHandleSpinFinish={ res => {
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
    <div className="background-layer" style={{ background: `url(${ appSettings?.game_bg }) no-repeat center center` }}></div> 
    <div className="luckywheel-container __container">
      <div className="__container__inner-transparent">
        { 
          cuocPopup == false ? <>
            <strong style={{ 
              textAlign: 'center', 
              display: 'block', 
              width: '100%',
              background: 'black',
              color: 'white', }}>Bạn đã cược { user.cuoc } tháng. { lock ? '' : <u style={{ cursor: 'pointer' }} onClick={ e => {
              setCuocPopup(true) 
            } }>Chọn lại 👈</u> }</strong>
          </> : ''
        }
        { wheel }
        <CuocPopup active={ cuocPopup } onConfirm={ e => {
          setCuocPopup(false)
        } } />
      </div>
    </div>
  </>
}