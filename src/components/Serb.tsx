import useDate from "../date.hook"
import { ResultType } from "../types"

interface ISerb {
  serb: ResultType
}

const Serb: React.FC<ISerb> = ({ serb }) => {
  const dateCheck = useDate(serb.checkedOn)
  const dateIndex = useDate(serb.indexedOn)
  
  return (
    <div className="serb">
      <div className="serb-title">{serb.serb}</div>
      <div className="serb-entry">
        <b>Checked on:</b> <small>{dateCheck.smalldate}, {dateCheck.time}</small><br />
        <b>Indexed on:</b> <small>{dateIndex.smalldate}, {dateIndex.time}</small>
      </div>
    </div>
  )
}

export default Serb