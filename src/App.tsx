import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormBox from './components/FormBox'
import Pager from './components/Pager'
import Popup from './components/Popup'
import SearchLine from './components/SearchLine'
import Trow from './components/Trow'
import { setLoad } from './store/appSlice'
import { AppDispatch, RootState } from './store/store'
import { RowType } from './types'

function App() {
  const visible = 3
  const [rows, setRows] = useState<RowType[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const currentPage = useSelector((state: RootState) => state.app.page)
  const loading = useSelector((state: RootState) => state.app.loading)
  const filter = useSelector((state: RootState) => state.app.filter)
  const search = useSelector((state: RootState) => state.app.search)
  const dispatch = useDispatch<AppDispatch>()


  // Fetching rows
  useEffect(() => {
    if (loading) {
      fetch(`https://serpindex-demo.svc.violetvault.com/api/Index?Count=${visible}&Page=${currentPage}${filter}${search}`)
        .then(response => response.json())
        .then(data => {
          setRows(data)
          dispatch(setLoad(false))
        })
        .catch(error => console.error(error))
    }
  }, [loading, currentPage, dispatch, filter, search])


  return (
    <div className="app">
      <div className="app-header d-flex align-items-center justify-content-between">
        <h1>Table</h1>
        <button className="btn btn-warning" onClick={() => setShowForm(true)}>Add entry</button>
      </div>
      <div className="app-body">

        <SearchLine />

        {loading ? <p>Loading...</p> :
        <>

          <table className="table table-striped">
            <thead>
              <tr>
                <th rowSpan={2}>Created On</th>
                <th rowSpan={2}>Title</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Domain</th>
                <th rowSpan={2}>Days until expired</th>
                <th rowSpan={2}>Indexed languages</th>
                <th rowSpan={2}>Unindexed languages</th>
                <th colSpan={3}>Indexed</th>
              </tr>
              <tr>
                <th className="small">indexed count</th>
                <th className="small">indexed expired count</th>
                <th className="small">indexed total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => <Trow key={row.id} el={row} />)}
              {!rows.length && <tr>
                <td colSpan={10}>Not found</td>
              </tr>}
            </tbody>
          </table>
        </>}

      </div>
      <div className="app-footer">
        <Pager visible={visible} />
        <Popup />
        <FormBox show={showForm} hide={() => setShowForm(false)} />
      </div>
    </div>
  )
}

export default App
