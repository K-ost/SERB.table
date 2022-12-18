import useDate from "../date.hook"
import { EntriesType } from "../types"
import Serb from "./Serb"

interface IResult {
  el: EntriesType
}

const Entry: React.FC<IResult> = ({ el }) => {
  const date = useDate(el.createdOn)

  return (
    <tr>
      <td className="date">{date.smalldate}<br /> <small>{date.time}</small></td>
      <td><span className="badge bg-warning text-dark">{el.language}</span></td>
      <td className="title"><a href={el.url} target="_blank" rel="noreferrer">{el.title}</a></td>
      <td>{el.indexedCount}</td>
      <td>{el.indexedTotal}</td>
      <td>{el.indexedValidCount}</td>
      <td>{el.results.map((se, index) => <Serb key={index} serb={se} />)}</td>
    </tr>
  )
}

export default Entry