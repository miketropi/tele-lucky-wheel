import React, { useState, useEffect, useCallback } from 'react';
import { useLuckyWheelContext } from '../context/AppContext';
import { Wheel } from 'react-custom-roulette';
import { useNavigate } from "react-router-dom";


export default function LuckyWheelComp({ onHandleSpinFinish }) {
  const nav = useNavigate(); 
  const { gifts, giftColors, fn, error, setError } = useLuckyWheelContext();
  const { onSpin, onSpin2 } = fn;
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [delay, setDelay] = useState();
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    setDelay(randomInteger(3, 8))
  }, [])

  useEffect(() => {
    if(isStart != true) return;

    let _delay = delay;
    let _setInterval = setInterval(() => {
      if(_delay <= 0) { clearInterval(_setInterval); 
        
        return; 
      }
      setDelay(_delay -= 1);
    }, 1000); 

    return () => {
      clearInterval(_setInterval);
    }
  }, [isStart])

  useEffect(() => {
    if(delay != 0) return;
    const __run = async () => {
      // const rewardIndex = await onSpin(gifts);
      await onSpin2((res) => {
        // console.log('onSpin2', res);
        if(res?.rewardSelected) {
          let { __id, name } = res.rewardSelected;
          let rewardIndex = gifts.findIndex(g => g.__id == __id);

          setPrizeNumber(rewardIndex);
          setMustSpin(true);
        } else {
          // alert(`INTERNAL ERROR: Please relead `)
          // alert(JSON.stringify(res))
          // error
          setError(res); 
          nav('/error');
        }
      });
      // setPrizeNumber(rewardIndex);
      // setMustSpin(true);
    }
    __run(); 
  }, [delay])

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSpinClick = async () => {
    if (!mustSpin) {  
      setIsStart(true);
    } 
  }

  return <>
    {/* {
      gifts.filter(g => (g.qty > 0)).map(g => {
        return <span key={ g?.__id }>{ g.name }: { g.qty }: { g.probability } |</span>
      })
    } */}
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      outerBorderWidth={2}
      radiusLineWidth={2}
      fontFamily={ `League Spartan` }
      data={ [...gifts].map((g, __g_index) => {
        return { option: g.name, style: { backgroundColor: giftColors[__g_index] } }
      } ) }
      onStopSpinning={() => {
        setMustSpin(false);
        onHandleSpinFinish(gifts[prizeNumber].name)
      }}
    /> 
    <div style={{ textAlign: 'center' }}> 
      {
        isStart 
          ? (() => {
            if(delay <= 0) {
              return <p className="__in-spin-message">Đang trong hàng đợi, sẽ bắt đầu trong giây lát...!</p> 
            } else {
              return <p className="__in-spin-message">Vòng quay sẽ bắt đầu trong { delay }s nữa, vui lòng chờ!</p>
            }
            
          })()
          : <button className="button" onClick={handleSpinClick}>Bấm để quay thưởng (1 lượt duy nhất) 🎉</button>
      }
       
    </div>
  </>

}