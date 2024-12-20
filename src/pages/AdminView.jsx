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

export default function AdminView() {
  const { users, gifts, fn } = useAdminViewContext();
  const { onTestReward } = fn;
  return <div className="admin-view">
    <div className="container">
      <GiftsTable gifts={ gifts } /> 
      {/* <button onClick={ onTestReward }>Test Reward</button> */}
      {/* <div>{ JSON.stringify(users) }</div> */}
      {/* <div>{ JSON.stringify(gifts) }</div> */}
      
    </div>
  </div>
}