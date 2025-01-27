import { useEffect } from "react";
import { useLuckyWheelContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function ErrorScreen() {
  const navigate = useNavigate();

  const { error, appSettings } = useLuckyWheelContext();
  useEffect(() => {
      // console.log(appSettings);
      if(appSettings.game_status) {
        if(appSettings.game_status == 'on') {
          navigate('/') 
        }
      } 
    }, [appSettings?.game_status])

  return <>
    <div className="background-layer" style={{ background: `url(${ appSettings?.game_bg }) no-repeat center center` }}></div> 
      <div className="welcome-container __container">
        <div className="__container__inner">
          <h4 className="h-title">Thông báo,</h4>
          <p>{ error?.message }</p> 
        </div>
      </div>
  </>
}