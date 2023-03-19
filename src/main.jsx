import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import notesReducer from "./features/note";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";

const persistConfig = {
  key: "short-notes",
  storage,
};

const persistedReducer = persistReducer(persistConfig, notesReducer);

const store = configureStore({
  reducer: { notes: persistedReducer },
  middleware: [thunk],
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
