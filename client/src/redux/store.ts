import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import customerReducer from "./customerSlice";
import adminReducer from "./adminSlice";
import createSagaMiddleware from "redux-saga";
import userSaga from "./sagas";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    admin: adminReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(userSaga);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
