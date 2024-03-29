import { createSlice } from '@reduxjs/toolkit'

export interface appState {
  loading: boolean
  page: number
  popupOpen: boolean
  currentID: string
  filter: string
  total: number
  search: string
  notice: string
  clearField: boolean
}

const initialState: appState = {
  loading: true,
  page: 1,
  popupOpen: false,
  currentID: '',
  filter: '',
  total: 0,
  search: '',
  notice: '',
  clearField: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
      state.loading = true
    },
    setLoad: (state, action) => {
      state.loading = action.payload
    },
    setPopup: (state, action) => {
      state.popupOpen = action.payload
    },
    setCurrentID: (state, action) => {
      state.currentID = action.payload
    },
    clearData: (state) => {
      state.currentID = ''
    },
    setNotice: (state, action) => {
      state.notice = action.payload
    },
    setRefresh: (state) => {
      state.currentID = ''
      state.loading = true
      state.page = 1
      state.filter = ''
      state.search = ''
      state.notice = ''
      state.clearField = true
    },
    setFilter: (state, action) => {
      if (action.payload === 'full') {
        state.filter = '&FullIndexed=true'
      } else if (action.payload === 'notfull') {
        state.filter = '&FullIndexed=false'
      } else {
        state.filter = ''
      }
      state.loading = true
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
    setSearched: (state, action) => {
      state.search = action.payload
    },
    setClear: (state) => {
      state.clearField = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPage, setLoad, setPopup, setCurrentID, clearData, setRefresh, setFilter, setTotal, setSearched, setNotice, setClear } = appSlice.actions
export default appSlice.reducer