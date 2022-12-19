import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setNotice } from '../store/appSlice';
import { AppDispatch, RootState } from '../store/store';

const Notify = () => {
  const dispatch = useDispatch<AppDispatch>()
  const notice = useSelector((state: RootState) => state.app.notice)

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast show={notice.length > 0} onClose={() => dispatch(setNotice(''))} autohide delay={7000}>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>5 sec ago</small>
        </Toast.Header>
        <Toast.Body>{notice}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notify