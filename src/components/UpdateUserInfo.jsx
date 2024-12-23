import { Link } from "react-router-dom";
import { useLuckyWheelContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo() {
  const navigate = useNavigate();

  const { user, setUser, fn, gifts } = useLuckyWheelContext();
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
      let giftsAvailable = gifts.filter(g => g.qty > 0).length;
      let directUrl = user.gift ? '/thankyou' : (giftsAvailable == 0 ? '/endgame' : '/luckywheel');
      navigate(directUrl)
    } }>
      <p>
        <label>Họ và tên*</label>
        <input 
          type="text" 
          value={ user?.update_info?.full_name } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'full_name') }  } />
      </p>
      <p>
        <label>Địa chỉ Email*</label>
        <input 
          type="email" 
          value={ user?.update_info?.email } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'email') }  } />
      </p>
      <p>
        <label>Phone number*</label>
        <input 
          type="text" 
          value={ user?.update_info?.phone } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'phone') }  } />
      </p>
      <p>
        <label>Discord ID*</label>
        <input 
          type="text" 
          value={ user?.update_info?.discord_id } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'discord_id') }  } />
      </p>
      <p className="form-actions">
        {/* <Link to="/">Trở về</Link>  */}
        <button className="button" type="submit">👉 Cập nhật</button>
      </p>
    </form>
  </div>
}