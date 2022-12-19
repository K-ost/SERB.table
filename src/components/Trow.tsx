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

  // indexed counts
  let indexedCount: number = el.entries.reduce((acum: number, el) => acum += el.indexedCount, 0)
  let indexedValidCount: number = el.entries.reduce((acum: number, el) => acum += el.indexedValidCount, 0)
  let indexedTotal: number = el.entries.reduce((acum: number, el) => acum += el.indexedTotal, 0)

  
  // Date
  const { expiredDate } = useDate(el.validUntil)


  // trowClass
  const trowClass = (totalIndexed === el.entries.length) ? 'trow fully-indexed' :
                    (totalUnindexed === el.entries.length) ? 'trow unindexed' : 'trow'
  
  return (
    <tr onClick={() => clickRow(el.id)} className={trowClass}>
      <td className="date">{createDate.smalldate}<br /> <small>{createDate.time}</small></td>
      <td><b>{el.title}</b></td>
      <td><span className={`badge rounded-pill ${badgeClass}`}>{el.category}</span></td>
      <td>{el.domain}</td>
      <td className="date">{(expiredDate > 0) ? expiredDate : 'expired'}</td>
      <td className="max-100">
        {totalIndexed > 0 && <Lang list={el.entries} />}
      </td>
      <td className="max-100">
        {totalUnindexed > 0 && <Lang list={el.entries} />}
      </td>
      <td>{indexedCount}</td>
      <td>{indexedValidCount}</td>
      <td>{indexedTotal}</td>
    </tr>
  )
}

export default Trow