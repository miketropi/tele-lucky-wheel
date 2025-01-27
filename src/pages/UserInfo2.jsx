import UpdateUserInfo2 from "../components/UpdateUserInfo2"
import { useLuckyWheelContext } from "../context/AppContext"

export default function UserInfo2() {
  const { appSettings } = useLuckyWheelContext();
  return <>
    <div className="background-layer" style={{ background: `url(${ appSettings?.game_bg }) no-repeat center center` }}></div> 
    <div className="userinfo-2-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Cập nhật phương thức nhận quà</h4>
        <p>Vui lòng chọn sàn và cung cấp cho chúng tôi UID để nhận USDT, địa chỉ đang ở để nhận hiện vật.</p> 
        <UpdateUserInfo2 />
      </div>
    </div>
  </>
}