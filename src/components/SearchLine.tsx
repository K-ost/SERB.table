import { useState } from "react"
import { useDispatch } from "react-redux"
import { setFilter, setLoad, setSearched } from "../store/appSlice"
import { AppDispatch } from "../store/store"
import SearchInput from "./SearchInput"

const SearchLine: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [domain, setDomain] = useState<string>('')
  const [cat, setCat] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  // searchFunc
  const searchFunc = (e: any) => {
    e.preventDefault()
    let str1 = domain && '&Domain=' + domain
    let str2 = cat && '&Category=' + cat
    let str3 = search && '&Search=%' + search + '%'
    let str4 = url && '&Url=' + url
    let str = str1 + str2 + str3 + str4
    dispatch(setSearched(str))
    dispatch(setLoad(true))
  }

  return (
    <div className="searchbox">
      <form onSubmit={searchFunc}>
        <div className="input-group">
          <SearchInput place="Domain" handler={e => setDomain(e.target.value)} />
          <SearchInput place="Category" handler={e => setCat(e.target.value)} />
          <SearchInput place="Search" handler={e => setSearch(e.target.value)} />
          <SearchInput place="Url" handler={e => setUrl(e.target.value)} />
          <input type="text" className="form-control" placeholder="Created After" />
          <button className="btn btn-warning" type="submit">Search</button>
        </div>
      </form>
      <select className="form-select" onChange={e => dispatch(setFilter(e.target.value))}>
        <option value="all">All</option>
        <option value="full">FullIndexed</option>
        <option value="notfull">Not FullIndexed</option>
      </select>
    </div>
  )
}

export default SearchLine