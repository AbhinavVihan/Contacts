import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import contactsReducer from "./contactsSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// Create a typed dispatch hook
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
