import { useLuckyWheelContext } from "../context/AppContext";
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useLuckyWheelContext();
  const [nextStepNumber, setNextStepNumber] = useState(30);

  useEffect(() => {
    if(nextStepNumber < 0) {
      navigate('/update-userinfo')
      return;
    }

    let t = setTimeout(() => { 
      setNextStepNumber(nextStepNumber - 1)
    }, 1000);

    return () => {
      clearTimeout(t);
    }
  }, [nextStepNumber])
  
  return <>
    <div className="background-layer"></div> 
    <div className="welcome-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Welcome <u>{ user?.tele_userinfo_full?.username }</u>,</h4>
        <p>A1A team chúc bạn một mùa giáng sinh an lành, Merry Christmas and Happy New Year. 🎉</p>
        <button className="button" onClick={ e => {
          e.preventDefault();
          navigate('./update-userinfo')
        } }>👉 Tiếp theo ({ nextStepNumber })</button>
      </div>
    </div>
  </>
  
}