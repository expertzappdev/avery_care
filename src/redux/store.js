import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ localStorage use karega
import authReducer from "./authSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

// ✅ persist config for auth state
const persistConfig = {
  key: "auth",
  storage,
};

// ✅ auth reducer ko persist karo
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // ✅ persisted reducer lagaya
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // ✅ redux-persist ke liye required
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
