import { useAdminViewContext } from "../context/AdminViewContext";

import '../AdminView.scss';

const GiftsTable = ({ gifts }) => {
  const { editSlot, setEditSlot, fn } = useAdminViewContext();
  const { onUpdateQtyGift, onAddReward, onUpdateNameGift, onDeleteRewardItem } = fn;
  
  return <>
    <h4>Rewards</h4>
    <table className="table __align-middle">
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          gifts.length > 0 && 
          gifts.map((g, index) => {
            return <tr key={ g.__id }>
              <td>{ index + 1 }</td>
              <td>
                {/* { g?.name } */}
                {
                  (() => {
                    if(editSlot) {
                      return <input style={{ width: `70px` }} type="text" value={ g?.name } onChange={ e => {
                        onUpdateNameGift(g.__id, e.target.value)
                      } } />
                    } else {
                      return g?.name;
                    }
                  })()
                }
              </td>
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
              <td>
                {
                  editSlot && <button className="button" onClick={ e => {
                    e.preventDefault();
                    let r = confirm('Delete this reward???');
                    if(r == true) {
                      onDeleteRewardItem(g.__id)
                    }
                  } }>Delete</button>
                }
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
    {
      editSlot && <button className="button" onClick={ async e => {
        e.preventDefault();
        await onAddReward();
      } }>Add more reward</button>
    }
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
  const { editSlot, fn } = useAdminViewContext();
  const { onClearAllUser } = fn;

  return <>
    <h4>Người tham gia ({ users.length })</h4> 
    {
      editSlot && <>
        <button className="button" onClick={ e => {
          const r = confirm('Delete all users???')
          if(r) {
            onClearAllUser();
          }
        } }>Reset Users</button>
        <hr style={{ margin: `1em 0` }} />
      </>
    }
    
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
                  user?.update_info && Object.keys(user?.update_info).map((__k, __k_index) => {
                    return <p key={ __k_index }>{ __k }: <strong>{ user?.update_info[__k] }</strong></p>
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

const TableSettings = () => {
  const { editSlot, appSettings, fn } = useAdminViewContext();
  const { onUpdateSetting } = fn;
  return <>
    <h4>Game Settings</h4>
    {/* {
      JSON.stringify(appSettings)
    } */}
    <table className="table __align-middle">
      <tbody>
        <tr>
          <th>Game Status</th>
          <td>
            {
              editSlot ? <>
              <select value={ appSettings?.game_status } onChange={ e => {
                onUpdateSetting('global_settings', {
                  game_status: e.target.value,
                })
              } }>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
              </> : appSettings?.game_status
            }
          </td>
        </tr>
        <tr>
          <th>Background App:</th>
          <td>
            {
              editSlot ? <>
                <input type="text" value={ appSettings?.game_bg } style={{ width: `100%` }} onChange={ e => {
                  onUpdateSetting('global_settings', {
                    game_bg: e.target.value,
                  })
                } } />
              </> : <a href={ appSettings?.game_bg } target="_blank">{ appSettings?.game_bg }</a>
            }
            </td>
        </tr>
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
          <div className="__sticky">
            <GiftsTable gifts={ gifts } />
            <hr style={{ marginTop: `32px` }} />
            <TableSettings />
          </div>
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
          {/* <UsersTables users={ users.filter(u => u.gift) } /> */}
          <UsersTables users={ users } />
        </div>
      </div>
    </div>
  </div>
}