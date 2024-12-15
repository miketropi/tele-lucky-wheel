import { useLuckyWheelContext } from "../context/AppContext";

export default function UserInfo() {
  const { user } = useLuckyWheelContext();

  return <div className="user-info">
    {
      user && <>
        <p>Xin chào <strong>{ user?.tele_userinfo_full?.username }</strong>, Chúc bạn ngày tốt lành!!!</p>
        <p>(Tham gia quay thưởng nhận ngay phần quà đến từ nhà <strong>A1Academy</strong>)</p>
      </>
    }
    {/* { JSON.stringify(user) }  */}
  </div>
}