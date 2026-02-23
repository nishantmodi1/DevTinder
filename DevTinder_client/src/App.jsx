import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Login from "./page/authpage/Login"
import Layout from "./components/layout/Layout"
import { Provider } from 'react-redux'
import { store } from "./utils/appStore"


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
