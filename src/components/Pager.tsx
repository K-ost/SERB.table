import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPage, setRefresh, setTotal } from "../store/appSlice"
import { AppDispatch, RootState } from "../store/store"

interface IPager {
  visible: number
}

const Pager: React.FC<IPager> = ({ visible }) => {
  const page = useSelector((state: RootState) => state.app.page)
  const loading = useSelector((state: RootState) => state.app.loading)
  const total = useSelector((state: RootState) => state.app.total)
  const filter = useSelector((state: RootState) => state.app.filter)
  const search = useSelector((state: RootState) => state.app.search)
  const dispatch = useDispatch<AppDispatch>()
  const pagesCount = Math.ceil(total / visible)
  const pagesArray = []

  for (let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i)
  }
  

  // Fetching rows
  useEffect(() => {
    if (page) {
      fetch(`https://serpindex-demo.svc.violetvault.com/api/Index?Page=1${filter}${search}`)
        .then(response => response.json())
        .then(data => dispatch(setTotal(data.length)))
    }
  }, [page, dispatch, filter, search])

  return (
    <nav className="d-flex align-items-center">
      <ul className="pagination mb-0 me-3">
        
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => dispatch(setPage(page - 1))}
            disabled={page === 1}
          >Previous</button>
        </li>

        {pagesArray.map(el => {
          const pagerClass = el === page ? "page-link active" : "page-link"
          return <li className="page-item" key={el}>
            <button className={pagerClass} onClick={() => dispatch(setPage(el))}>{el}</button>
          </li>
        })}

        <li className="page-item">
          <button
            className="page-link"
            onClick={() => dispatch(setPage(page + 1))}
            disabled={page === 3}
          >Next</button>
        </li>
        
      </ul>
      
      <button className="btn btn-outline-primary me-3" onClick={() => dispatch(setRefresh())}>Refresh</button>

      {loading &&
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    </nav>
  )
}

export default Pager