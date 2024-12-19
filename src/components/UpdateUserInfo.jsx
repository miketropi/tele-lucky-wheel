import { Link } from "react-router-dom";
import { useLuckyWheelContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo() {
  const navigate = useNavigate();

  const { user, setUser, fn } = useLuckyWheelContext();
  const { onUpdateUserInfo } = fn;

  const onUpdateUserInfo_fn = (value, name) => {
    let _user = { ...user }

    if(!_user.update_info) {
      _user.update_info = {};
    }

    _user.update_info[name] = value;
    // alert(JSON.stringify(_user));
    setUser(_user);
  }

  return <div className="__">
    {/* { JSON.stringify(user) }  */}
    <form className="form update-user-info__form" onSubmit={ async e => {
      e.preventDefault();
      // alert(JSON.stringify(user.update_info))
      await onUpdateUserInfo(user.update_info); 
      navigate('/luckywheel')
    } }>
      <p>
        <label>Họ và tên</label>
        <input 
          type="text" 
          value={ user?.update_info?.full_name } 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'full_name') }  } />
      </p>
      <p>
        <label>Địa chỉ Email</label>
        <input 
          type="email" 
          value={ user?.update_info?.email } 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'email') }  } />
      </p>
      <p>
        <label>Phone number</label>
        <input 
          type="text" 
          value={ user?.update_info?.phone } 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'phone') }  } />
      </p>
      <p className="form-actions">
        {/* <Link to="/">Trở về</Link>  */}
        <button className="button" type="submit">👉 Cập nhật</button>
      </p>
    </form>
  </div>
}