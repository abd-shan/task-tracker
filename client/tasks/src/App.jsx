import { useState } from 'react'
import Tasks from "./pages/Tasks.jsx";
import {Provider} from "react-redux";
import store from "./services/store.js";
import {ToastContainer} from "react-toastify";

function App() {

  return (
    <>
        <Provider store={store}>
            <Tasks/>
        </Provider>
        <ToastContainer />
    </>
  )
}

export default App
