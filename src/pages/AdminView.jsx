import { useAdminViewContext } from "../context/AdminViewContext";

import '../AdminView.scss';

const GiftsTable = ({ gifts }) => {
  const { fn } = useAdminViewContext();
  const { onUpdateQtyGift } = fn;
  
  return <>
    <h4>Gifts</h4>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Xác suất (%)</th>
        </tr>
      </thead>
      <tbody>
        {
          gifts.map((g, index) => {
            return <tr key={ g.__id }>
              <td>{ index + 1 }</td>
              <td>{ g?.name }</td>
              <td>
                {/* { g?.qty }  */}
                <input style={{width: `50px`}} type="number" value={ g?.qty } onChange={ e => {
                onUpdateQtyGift(g.__id, e.target.value)
              } } />
              </td>
              <td>{ g?.probability }%</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </>
}

const LogsTables = ({ data }) => {

  const _date = (time) => {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000,
    );
    const date = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString();

    return `${ date } ${ atTime }`;
  }

  return <>
    <h4>Logs Rewards</h4>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Reward</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          [...data].map((l, index) => {
            console.log(l)
            const { userid, reward, date, __user } = l;
            return (<tr key={ l.__id }>
              <td></td>
              <td><strong>{ __user?.tele_userinfo_full?.username }</strong> (#{ userid })</td>
              <td>{ reward }</td>
              <td>{ _date(date) }</td>
            </tr>)
          })
        }
      </tbody>
    </table>
  </>
}

export default function AdminView() {
  const { users, gifts, logs, fn } = useAdminViewContext();
  const { onTestReward } = fn;
  return <div className="admin-view">
    <div className="container">
      <div className="cont-2cols">
        <div>
          <GiftsTable gifts={ gifts } /> 
          {/* <button className="button" onClick={ onTestReward }>Test Reward</button> */}
        </div>
        <div>
          {
            logs.length > 0 && <LogsTables data={ logs.map(l => {
              l.__user = users.find(__u => __u.__id == l.userid)
              return l;
            }) } />
          }
        </div>
      </div>
    </div>
  </div>
}