import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  source: null,
  destination: null,
  timeTaken: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTimeTaken: (state, action) => {
      state.timeTaken = action.payload;
    },
  },
});

export const { setSource, setDestination, setTimeTaken } = appSlice.actions;

export const selectSource = (state) => state.app.source;
export const selectDestination = (state) => state.app.destination;
export const selectTimeTaken = (state) => state.app.timeTaken;

export default appSlice.reducer;
