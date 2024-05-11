import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./scoreSlice";
import currentSitesSlice from "./currentSitesSlice";

const store = configureStore({
  reducer: combineReducers({
    score: scoreReducer,
    currentSites: currentSitesSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
