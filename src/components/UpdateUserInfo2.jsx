import { Link } from "react-router-dom";
import { useLuckyWheelContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo2() {
  const navigate = useNavigate();
  const { user, setUser, fn, gifts } = useLuckyWheelContext();
  const { onUpdateUserInfo } = fn;

  const onUpdateUserInfo_fn = (value, name) => {
    let _user = { ...user }

    if(!_user.update_info) {
      _user.update_info = {};
    }

    _user.update_info[name] = value;
    // console.log(_user.update_info);
    // alert(JSON.stringify(_user));
    setUser(_user);
  }

  return <div>
    <form className="form update-user-info__form" onSubmit={ async e => {
      e.preventDefault();
      // alert(JSON.stringify(user.update_info))
      await onUpdateUserInfo(user.update_info); 
      let giftsAvailable = gifts.filter(g => g.qty > 0).length;
      let directUrl = user.gift ? '/thankyou' : (giftsAvailable == 0 ? '/endgame' : '/luckywheel');
      navigate(directUrl)
    } }>
      <div className="__field-group">
        <label>Chọn sàn*</label>
        <div className="__field-2cols">
          <label className="__radio-field-wrap">
            <input 
            type="radio" 
            name="trading_floor"
            value='OKX' 
            checked={ (user?.update_info?.trading_floor == 'OKX' ? true : false) }
            required 
            onChange={ e => {
              // console.log(e.target.value);
              onUpdateUserInfo_fn(e.target.value, 'trading_floor')
            } } />
            <span>OKX</span>
          </label>
          <label className="__radio-field-wrap">
            <input 
            type="radio" 
            name="trading_floor"
            value='Binance' 
            checked={ (user?.update_info?.trading_floor == 'Binance' ? true : false) }
            required 
            onChange={ e => {
              // console.log(e.target.value);
              onUpdateUserInfo_fn(e.target.value, 'trading_floor')
            } } />
            <span>Binance</span>
          </label>
        </div>
      </div>
      <p>
        <label>Nhập UID*</label>
        <input 
          type="text" 
          value={ user?.update_info?.uid } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'uid') }  } />
      </p>
      <p>
        <label>Địa chỉ nhận quà*</label>
        <input 
          type="text" 
          value={ user?.update_info?.address } 
          required 
          onChange={ e => { onUpdateUserInfo_fn(e.target.value, 'address') }  } />
      </p>
      <p className="form-actions">
        <Link to="/update-userinfo">Quay lại</Link> 
        <button className="button" type="submit">👉 Quay Thưởng</button>
      </p>
    </form>
  </div>
}