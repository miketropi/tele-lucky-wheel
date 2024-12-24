import UpdateUserInfo2 from "../components/UpdateUserInfo2"

export default function UserInfo2() {
  return <>
    <div className="background-layer"></div> 
    <div className="userinfo-2-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Cập nhật phương thức nhận quà</h4>
        <p>Vui lòng chọn sàn và cung cấp cho chúng tôi UID để nhận USDT, địa chỉ đang ở để nhận hiện vật.</p> 
        <UpdateUserInfo2 />
      </div>
    </div>
  </>
}