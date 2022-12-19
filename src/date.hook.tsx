import { DateType } from "./types"

const useDate = (data: any): DateType => {
  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
  const fullDate = new Date(data)
  
  let currentMonth: string = months[fullDate.getMonth()]
  let simpleDay = (fullDate.getDate() < 10) ? '0' + fullDate.getDate() : fullDate.getDate()
  let simpleMonth = (fullDate.getMonth() < 10) ? '0' + (fullDate.getMonth() + 1) : fullDate.getMonth() + 1
  let minutes = (fullDate.getMinutes() < 10) ? '0' + fullDate.getMinutes() : fullDate.getMinutes()
  
  let date: string = `${currentMonth} ${fullDate.getDate()}, ${fullDate.getFullYear()}`
  let smalldate: string = simpleDay + '.' + simpleMonth + '.' + fullDate.getFullYear()
  let time: string = `${fullDate.getHours()}:${minutes}`

  // Getting expired date
  const currentDate = new Date()
  const dateUntil = new Date(data)
  const expiredDate = Math.ceil(Math.ceil(dateUntil.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
  
  return { date, time, smalldate, expiredDate }
}

export default useDate