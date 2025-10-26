import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../type/common";

type LocationState = {
  location: ILocation | null;
};

const initialState: LocationState = {
  location: null,
};

const locationSlicer = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, actions: PayloadAction<ILocation>) => {
      state.location = actions.payload;
    },
    removeLocation: (state) => {
      state.location = null;
    },
  },
});

export const setLocation = locationSlicer.actions.setLocation;
export const removeLocation = locationSlicer.actions.removeLocation;
export const locationReducer = locationSlicer.reducer;
