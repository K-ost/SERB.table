import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface ISearchInput {
  handler: (e: any) => void
  place: string
}

const SearchInput: React.FC<ISearchInput> = ({ handler, place }) => {
  const ref = useRef<HTMLInputElement>(null)
  const clear = useSelector((state: RootState) => state.app.clearField)

  useEffect(() => {
    if (clear) {
      ref.current!.value = ''
    }
  }, [clear])

  return (
    <input type="text" className="form-control" placeholder={place} onChange={handler} ref={ref} />
  )
}

export default SearchInput