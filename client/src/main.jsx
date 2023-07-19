import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from './redux-store/index.js'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PURGE,
  PAUSE,
  PERSIST,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
     return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST],
      },
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
