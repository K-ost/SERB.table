import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pager from './components/Pager'
import Popup from './components/Popup'
import Trow from './components/Trow'
import { setLoad } from './store/appSlice'
import { AppDispatch, RootState } from './store/store'
import { RowType } from './types'

function App() {
  const visible = 3
  const [rows, setRows] = useState<RowType[]>([])
  const currentPage = useSelector((state: RootState) => state.app.page)
  const loading = useSelector((state: RootState) => state.app.loading)
  const dispatch = useDispatch<AppDispatch>()


  // Fetching rows
  useEffect(() => {
    if (loading) {
      fetch(`https://serpindex-demo.svc.violetvault.com/api/Index?Count=${visible}&Page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          setRows(data)
          dispatch(setLoad(false))
        })
        .catch(error => console.error(error))
    }
  }, [loading, currentPage, dispatch])


  return (
    <div className="app">
      <div className="app-header">
        <h1>Table</h1>
      </div>
      <div className="app-body">

        {!rows.length ? <p>Loading...</p> :
        <>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Created On</th>
                <th>Title</th>
                <th>Category</th>
                <th>Domain</th>
                <th>Days until expired</th>
                <th>Indexed languages</th>
                <th> Unindexed languages</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => <Trow key={row.id} el={row} />)}
            </tbody>
          </table>
        </>}

      </div>
      <div className="app-footer">
        <Pager visible={visible} />
        <Popup />
      </div>
    </div>
  )
}

export default App
