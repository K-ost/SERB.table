import { EntriesType } from '../types'

interface ILang {
  list: EntriesType[]
}

const Lang: React.FC<ILang> = ({ list }) => {
  
  const newList: string[] = []
  list.forEach(el => {
    if (!newList.includes(el.language)) {
      newList.push(el.language)
    }
  })

  return (
    <>
      {newList.map((el, index) => <span key={index} className="badge bg-success badge-lang">{el}</span>)}
    </>
  )
}

export default Lang