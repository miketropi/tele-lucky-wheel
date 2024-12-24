import { useAdminViewContext } from "../context/AdminViewContext";

import '../AdminView.scss';

const GiftsTable = ({ gifts }) => {
  const { editSlot, setEditSlot, fn } = useAdminViewContext();
  const { onUpdateQtyGift } = fn;
  
  return <>
    <h4>Rewards</h4>
    <table className="table">
      <thead>
        <tr>
          <th>
            <span onDoubleClick={ e => {
            setEditSlot(true)
          } }>#</span>
          </th>
          <th>Name</th>
          <th>Slot</th>
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
                {
                  (() => {
                    if(editSlot) {
                      return <input style={{width: `50px`}} type="number" value={ g?.qty } onChange={ e => {
                        onUpdateQtyGift(g.__id, e.target.value)
                      } } />
                    } else {
                      return g?.qty
                    }
                  })()
                }
                
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

const UsersTables = ({ users }) => {
  return <>
    <h4>Người tham gia ({ users.length })</h4>
    <table className="table">
      <thead>
        <tr>
          <td>#</td>
          <td>User</td> 
          <td>Information</td> 
          <td>Reward</td>
        </tr>
      </thead>
      <tbody>
        {
          users.length > 0 && users.map((user, __u_index) => {
            let fullname = `${ user?.tele_userinfo_full?.first_name } ${ user?.tele_userinfo_full?.last_name }`;
            return <tr key={ user?.__id } className={ user?.gift ? `__reward-${ user?.gift.toLowerCase().replace('$', 'dola').replace('.', '-').replace(' ', '-') }` : '' }>
              <td>{ __u_index + 1 }</td>
              <td><strong>{ fullname }<br/></strong> (teleid: { user?.tele_userinfo_full?.id })</td>
              <td>
                <div className="__userinfo_area">
                {
                  user?.update_info && Object.keys(user?.update_info).map(__k => {
                    return <p>{ __k }: <strong>{ user?.update_info[__k] }</strong></p>
                  })
                }
                </div>
                {/* <p>discord_id: { user?.update_info?.discord_id }</p> */}
              </td> 
              <td>{ user?.gift }</td>
            </tr>
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
        <div className="l-col">
          <div className="__sticky"><GiftsTable gifts={ gifts } /></div>
          {/* <button className="button" onClick={ onTestReward }>Test Reward</button> */}
          {/* <hr />
          {
            logs.length > 0 && <LogsTables data={ logs.map(l => {
              l.__user = users.find(__u => __u.__id == l.userid)
              return l;
            }) } />
          } */}
        </div>
        <div className="r-col">
          <UsersTables users={ users } />
        </div>
      </div>
    </div>
  </div>
}