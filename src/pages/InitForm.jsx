import { useLuckyWheelContext } from "../context/AppContext";
import UpdateUserInfo from "../components/UpdateUserInfo";

export default function InitForm() {
  const { user } = useLuckyWheelContext();
  
  return <>
    <div className="background-layer"></div> 
    <div className="init-form-container __container">
      <div className="__container__inner">
        <h4 className="h-title">Cập nhật thông tin liên hệ</h4>
        <p>Trước khi tham gia quay thưởng, vui lòng cho chúng tôi thêm thông tin liên hệ khi nhận giải thưởng. 🥳</p>
        <UpdateUserInfo />
      </div>
    </div>
  </>
  
}