import { useLuckyWheelContext } from "../context/AppContext"

export default function EndGame() {
  const { appSettings } = useLuckyWheelContext()
  return <>
    <div className="background-layer" style={{ background: `url(${ appSettings?.game_bg }) no-repeat center center` }}></div> 
    <div className="welcome-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Thông báo,</h4>
        <p>Các phần quà đã được quay hết, hẹn gặp lại bạn mùa sau. Thank you!!!</p>
      </div>
    </div>
  </>
}