import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PreferenceState = {
  openSidebar: boolean,
  darkTheme: boolean
}

const initialState: PreferenceState = {
  openSidebar: false,
  darkTheme: false
}

const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
  }
});

export const { setOpenSidebar, setDarkTheme } = preferenceSlice.actions;
export default preferenceSlice.reducer;