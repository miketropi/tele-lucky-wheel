import { useLuckyWheelContext } from "../context/AppContext";

export default function ErrorScreen() {
  const { error } = useLuckyWheelContext();
  return <>
    <div className="background-layer"></div> 
      <div className="welcome-container __container">
        <div className="__container__inner">
          <h4 className="h-title">Thông báo,</h4>
          <p>{ error?.message }</p> 
        </div>
      </div>
  </>
}