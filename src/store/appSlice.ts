import { createSlice } from '@reduxjs/toolkit'

export interface appState {
  loading: boolean
  page: number
  popupOpen: boolean
  currentID: string
}

const initialState: appState = {
  loading: true,
  page: 1,
  popupOpen: false,
  currentID: ''
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
    setRefresh: (state) => {
      state.currentID = ''
      state.loading = true
      state.page = 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPage, setLoad, setPopup, setCurrentID, clearData, setRefresh } = appSlice.actions
export default appSlice.reducer