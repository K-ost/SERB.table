import { useDispatch } from "react-redux"
import { setFilter } from "../store/appSlice"
import { AppDispatch } from "../store/store"

const SearchLine: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="searchbox">
      <div className="input-group me-3">
        <input type="text" className="form-control" placeholder="Search..." />
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </div>
      <select className="form-select" onChange={e => dispatch(setFilter(e.target.value))}>
        <option value="all">All</option>
        <option value="full">FullIndexed</option>
        <option value="notfull">Not FullIndexed</option>
      </select>
    </div>
  )
}

export default SearchLine