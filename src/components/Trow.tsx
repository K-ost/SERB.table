import { useDispatch } from "react-redux"
import useDate from "../date.hook"
import { setCurrentID, setPopup } from "../store/appSlice"
import { AppDispatch } from "../store/store"
import { RowType } from "../types"
import Lang from "./Lang"

interface TrowInterface {
  el: RowType
}

const Trow: React.FC<TrowInterface> = ({ el }) => {
  const createDate = useDate(el.createdOn)
  const untilDate = useDate(el.validUntil)
  const dispatch = useDispatch<AppDispatch>()

  const badgeClass = (el.category === 'Learning') ? 'bg-warning text-dark' : 'bg-secondary'

  // clickRow
  const clickRow = (id: string) => {
    dispatch(setCurrentID(id))
    dispatch(setPopup(true))
  }


  // totalIndexed / totalUnindexed
  let totalIndexed: number = el.entries.reduce((acum: number, el) => {
    return acum += el.indexedTotal
  }, 0)
  let totalUnindexed = el.entries.length - totalIndexed
  
  
  return (
    <tr onClick={() => clickRow(el.id)} className="trow">
      <td className="date">{createDate.smalldate}<br /> <small>{createDate.time}</small></td>
      <td><b>{el.title}</b></td>
      <td><span className={`badge rounded-pill ${badgeClass}`}>{el.category}</span></td>
      <td>{el.domain}</td>
      <td className="date">{untilDate.smalldate}<br /> <small>{untilDate.time}</small></td>
      <td className="max-100">
        {totalIndexed > 0 && <Lang list={el.entries} />}
      </td>
      <td className="max-100">
        {totalUnindexed > 0 && <Lang list={el.entries} />}
      </td>
      <td>{totalIndexed}</td>
      <td>{totalUnindexed}</td>
      <td>{el.entries.length}</td>
    </tr>
  )
}

export default Trow