import { useLuckyWheelContext } from "../context/AppContext"
export default function Thankyou() {
  const { user, reward } = useLuckyWheelContext();
  return <>
    <div className="background-layer"></div> 
    <div className="thankyou-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Thank you!,</h4>
        <p>Chúc mừng, phần quà của bạn là <strong>{ reward }</strong>. Vui lòng chờ thông báo sớm nhất từ chúng tôi!!!</p>
        <p>from: A1A Team</p>
      </div>
    </div>
  </>
}