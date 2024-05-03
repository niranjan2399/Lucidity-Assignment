import { configureStore } from "@reduxjs/toolkit";
import { inventoryReducer } from "./reducers/inventoryReducer";
import { thunk } from "redux-thunk";

const reducer = {
  inventory: inventoryReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
