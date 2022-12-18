import { DateType } from "./types"

const useDate = (data: any): DateType => {
  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
  
  const fullDate = new Date(data)
  const currentMonth: string = months[fullDate.getMonth()]
  const simpleDay = (fullDate.getDate() < 10) ? '0' + fullDate.getDate() : fullDate.getDate()
  const simpleMonth = (fullDate.getMonth() < 10) ? '0' + fullDate.getMonth() : fullDate.getMonth()
  const minutes = (fullDate.getMinutes() < 10) ? '0' + fullDate.getMinutes() : fullDate.getMinutes()
  
  const date: string = `${currentMonth} ${fullDate.getDate()}, ${fullDate.getFullYear()}`
  const smalldate: string = simpleDay + '.' + simpleMonth + '.' + fullDate.getFullYear()
  const time: string = `${fullDate.getHours()}:${minutes}`
  
  return { date, time, smalldate }
}

export default useDate