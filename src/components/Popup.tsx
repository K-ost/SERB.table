import { useEffect, useState } from "react"
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useDate from "../date.hook"
import { clearData, setPopup } from "../store/appSlice"
import { AppDispatch, RootState } from "../store/store"
import { RowType } from "../types"
import Entry from "./Entry"

const Popup: React.FC = () => {
  const currentID = useSelector((state: RootState) => state.app.currentID)
  const popupOpen = useSelector((state: RootState) => state.app.popupOpen)
  const [info, setInfo] = useState<RowType | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  // Fetching single row
  useEffect(() => {
    if (currentID) {
      fetch(`https://serpindex-demo.svc.violetvault.com/api/Index/${currentID}`)
        .then(response => response.json())
        .then(data => setInfo(data))
    }
  }, [currentID])

  const createDate = useDate(info?.createdOn)
  const untilDate = useDate(info?.validUntil)

  // closePopup
  const closePopup = () => {
    dispatch(setPopup(false))
    dispatch(clearData())
    setInfo(null)
  }

  return (
    <Modal show={popupOpen} onHide={closePopup} centered className="largemodal">
      <Modal.Header closeButton>
        <Modal.Title>{info?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!info ? <Spinner /> :
        <>
          
          <p><b>Category</b>: {info?.category}<br />

          <b>Domain</b>: <a href={`http://${info?.domain}`} target="_blank" rel="noreferrer">{info?.domain}</a><br />

          <b>Created On</b>: <span className="date">{createDate.date} <small>{createDate.time}</small></span><br />

          <b>Days until expired</b>: <span className="date">{untilDate.date}, <small>{untilDate.time}</small></span></p>
          
          <p><b>Entries:</b></p>

          <table className="smalltable">
            <thead>
              <tr>
                <th rowSpan={2}>Created</th>
                <th rowSpan={2}>Language</th>
                <th rowSpan={2}>Title</th>
                <th colSpan={3}>Indexed</th>
                <th rowSpan={2}>SERB</th>
              </tr>
              <tr>
                <th>count</th>
                <th>total</th>
                <th>valid count</th>
              </tr>
            </thead>
            <tbody>
              {info?.entries.map((el, index) => <Entry key={index} el={el} />)}
            </tbody>
          </table>
        </>}
      </Modal.Body>
    </Modal>
  )
}

export default Popup