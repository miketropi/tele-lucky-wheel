import React, { useState, useEffect } from 'react'
import { Wheel } from 'react-custom-roulette';
import randomColor from 'randomcolor';

const data = [
  { option: 'Lồng đèn', style: { backgroundColor: randomColor({luminosity: 'light'}), textColor: 'black' } },
  { option: 'Dưa hấu', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: 'Đô la', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: '???', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: 'Mất lượt', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: 'M4 Pro Mac', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: 'iPhone 16', style: { backgroundColor: randomColor({luminosity: 'light'}) } },
  { option: '1000 Usdt', style: { backgroundColor: randomColor({luminosity: 'light'}) } }, 
]

export default function LuckyWheel({ gifts, onHandleSpinFinish }) { 
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return <>
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      fontFamily={ `Arial` }
      data={gifts}
      onStopSpinning={() => {
        setMustSpin(false);
        onHandleSpinFinish(gifts[prizeNumber].option)
      }}
    />
    <button onClick={handleSpinClick}>Quay Thưởng</button> 
  </>

}